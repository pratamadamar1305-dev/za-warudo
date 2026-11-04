#!/usr/bin/env python3
import os, json, math, subprocess
from PIL import Image, ImageFilter, ImageEnhance, ImageDraw, ImageFont
import numpy as np

# config
W, H = 1080, 1920
FPS = 30
DURATION = 19.6  # from original
FFMPEG = None
try:
    import imageio_ffmpeg
    FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
except:
    FFMPEG = 'ffmpeg'

# load beats
with open('/tmp/beats.json') as f:
    data = json.load(f)
beats = data['beats']
onsets = data['onsets']
tempo = data['tempo']
beat_interval = 60.0 / tempo
print(f"tempo {tempo}, beat_interval {beat_interval:.3f}")
print(f"beats {len(beats)}, onsets {len(onsets)}")

# source images
source_paths = [
    "/home/user/za-warudo/source_images/IMG-20261022-WA0006.jpg",
    "/home/user/za-warudo/source_images/IMG-20261023-WA0000.jpg",
    "/home/user/za-warudo/source_images/Screenshot_20261104_154955.jpg",
]
# load PIL images
sources = []
for p in source_paths:
    im = Image.open(p).convert("RGB")
    print(f"loaded {p} {im.size}")
    sources.append(im)

def cover_image(img, target_w, target_h):
    iw, ih = img.size
    scale = max(target_w / iw, target_h / ih)
    new_w = int(iw * scale)
    new_h = int(ih * scale)
    resized = img.resize((new_w, new_h), Image.LANCZOS)
    left = (new_w - target_w)//2
    top = (new_h - target_h)//2
    return resized.crop((left, top, left+target_w, top+target_h))

# pre-create backgrounds (blurred)
backgrounds = []
for idx, img in enumerate(sources):
    cov = cover_image(img, W, H)
    blurred = cov.filter(ImageFilter.GaussianBlur(radius=35))
    # darken
    # create overlay dark
    dark = Image.new("RGB", (W,H), (0,0,0))
    # blend 0.4 dark
    blurred_dark = Image.blend(blurred, dark, 0.35)
    backgrounds.append(blurred_dark)
    print(f"background {idx} prepared")

# precompute mask for rounded rectangle foreground
# Create mask for fg: white rounded rect inside margin
MARGIN = 28
RADIUS = 60
BORDER = 6
# create mask image
mask_full = Image.new("L", (W,H), 0)
draw = ImageDraw.Draw(mask_full)
# rounded rectangle: x0,y0,x1,y1
x0, y0 = MARGIN, MARGIN
x1, y1 = W - MARGIN, H - MARGIN
draw.rounded_rectangle([x0,y0,x1,y1], radius=RADIUS, fill=255)
# create border image (white stroke)
border_img = Image.new("RGBA", (W,H), (0,0,0,0))
draw_b = ImageDraw.Draw(border_img)
# outer rect with border
# draw white rounded rect border
# easiest: draw outer rounded rect white, inner transparent
# create border by drawing outer then inner cut
outer = Image.new("L", (W,H), 0)
d_outer = ImageDraw.Draw(outer)
d_outer.rounded_rectangle([x0-BORDER,y0-BORDER,x1+BORDER,y1+BORDER], radius=RADIUS+BORDER, fill=255)
inner = Image.new("L", (W,H), 0)
d_inner = ImageDraw.Draw(inner)
d_inner.rounded_rectangle([x0,y0,x1,y1], radius=RADIUS, fill=255)
# border mask = outer - inner
import PIL.ImageChops as Chops
border_mask = Chops.subtract(outer, inner)
# convert border_mask to RGBA white
border_rgba = Image.new("RGBA", (W,H), (255,255,255,255))
border_rgba.putalpha(border_mask)

# Also create shadow/glow behind? keep simple

# define segments: (start, end, img_idx, intensity)
# intensity controls shake/zoom amount
segments = [
    (0.00, 1.86, 0, "low"),
    (1.86, 3.55, 1, "low"),
    (3.55, 5.24, 2, "low"),
    (5.24, 6.51, 0, "medium"),
    (6.51, 7.77, 1, "medium"),
    (7.77, 9.04, 2, "medium"),
    (9.04, 10.32, 0, "medium"),
    (10.32, 11.15, 1, "medium"),
    (11.15, 11.57, 2, "high"),
    (11.57, 12.00, 0, "high"),
    (12.00, 12.42, 1, "high"),
    (12.42, 12.85, 2, "high"),
    (12.85, 13.27, 0, "high"),
    (13.27, 13.69, 1, "high"),
    (13.69, 14.11, 2, "high"),
    (14.11, 14.53, 0, "high"),
    (14.53, 14.96, 1, "high"),
    (14.96, 15.38, 2, "high"),
    (15.38, 15.98, 0, "high"),
    (15.98, 16.38, 1, "high"),
    (16.38, 16.80, 2, "high"),
    (16.80, 17.22, 0, "high"),
    (17.22, 17.65, 1, "high"),
    (17.65, 18.08, 2, "high"),
    (18.08, 18.51, 0, "high"),
    (18.51, 19.60, 1, "high"), # outro
]

def get_segment(t):
    for seg in segments:
        if seg[0] <= t < seg[1]:
            return seg
    return segments[-1]

# helper to find nearest beat distance
import bisect
beats_sorted = sorted(beats)
def time_since_last_beat(t):
    # find last beat <= t
    idx = bisect.bisect_right(beats_sorted, t) - 1
    if idx < 0:
        return max(0, t)  # before first beat, clamp to 0
    since = t - beats_sorted[idx]
    return max(0, since)

def time_until_next_beat(t):
    idx = bisect.bisect_right(beats_sorted, t)
    if idx >= len(beats_sorted):
        return beat_interval
    return beats_sorted[idx] - t

# text overlay preparation: we'll draw per frame for simplicity

# cache for cover images per source max zoom (1.6)
# To allow zoom, we need source larger than W x H. Pre-create cover at 1.6x scale
COVER_SCALE_MAX = 1.6
covers_max = []
for img in sources:
    cov_max = cover_image(img, int(W*COVER_SCALE_MAX), int(H*COVER_SCALE_MAX))
    covers_max.append(cov_max)

# also for blurred bg, we have already W x H version, but for consistency we could also zoom bg slightly
# Create blurred max too
blurred_max = []
for idx, img in enumerate(sources):
    cov = cover_image(img, int(W*COVER_SCALE_MAX), int(H*COVER_SCALE_MAX))
    blurred = cov.filter(ImageFilter.GaussianBlur(radius=35))
    dark = Image.new("RGB", (W*2, H*2), (0,0,0)) # not needed
    # Actually blur then dark blend
    dark2 = Image.new("RGB", cov.size, (0,0,0))
    blurred_dark = Image.blend(blurred, dark2, 0.35)
    blurred_max.append(blurred_dark)

# Load font if available
try:
    # Try to find a good font
    import pathlib
    font_path = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
    if not os.path.exists(font_path):
        font_path = None
except:
    font_path = None

# For overlay text: top left "9:16" and TikTok watermark
# We'll also add occasional flashing white overlay for beat

def make_frame(t):
    seg = get_segment(t)
    idx = seg[2]
    intensity = seg[3]
    # base cover_max for this idx
    base_cover = covers_max[idx]
    bg_max = blurred_max[idx]

    # compute shake & zoom
    # beat phase
    since = time_since_last_beat(t)
    # zoom calculation
    # Use exponential decay after beat for punch
    # For low: subtle
    # For medium/high: strong punch
    if intensity == "low":
        # gentle sine
        zoom = 1.0 + 0.06 * math.sin(2*math.pi*0.8*t) + 0.04 * math.sin(2*math.pi*1.6*t)
        zoom = max(1.02, zoom)  # clamp to avoid black bars from crop overflow
        shake_x = 10 * math.sin(2*math.pi*2*t)
        shake_y = 8 * math.cos(2*math.pi*2.2*t)
        rot = 0
        cc_brightness = 1.05
        cc_contrast = 1.1
        cc_color = 1.15
    elif intensity == "medium":
        # beat punch: zoom spikes at beat then decays
        # decay factor
        decay = math.exp(-since*8)  # fast decay 0.12s
        # base zoom 1.05 + punch 0.18 * decay
        zoom = 1.05 + 0.18 * decay + 0.03 * math.sin(2*math.pi*5*t)
        zoom = max(1.02, zoom)
        # add secondary pulse for 1:1 illusion? but okay
        shake_x = 18 * decay * math.sin(2*math.pi*16*t) + 6*math.sin(2*math.pi*3*t)
        shake_y = 14 * decay * math.cos(2*math.pi*16*t)
        # slight rotation
        rot = 1.2 * decay * math.sin(2*math.pi*12*t)
        cc_brightness = 1.08
        cc_contrast = 1.18
        cc_color = 1.25
    else: # high
        decay = math.exp(-since*10)
        # stronger zoom
        zoom = 1.12 + 0.28 * decay + 0.05 * math.sin(2*math.pi*8*t)
        zoom = max(1.05, zoom)
        # intense shake
        shake_x = 28 * decay * math.sin(2*math.pi*20*t) + 10 * math.sin(2*math.pi*4*t)
        shake_y = 22 * decay * math.cos(2*math.pi*20*t) + 8 * math.cos(2*math.pi*5*t)
        rot = 2.0 * decay * math.sin(2*math.pi*14*t)
        cc_brightness = 1.12
        cc_contrast = 1.26
        cc_color = 1.35

    # Normalize zoom to map to crop from base max
    # base max is 1.6x, we want final view W x H
    # base size = W*1.6 x H*1.6
    # desired zoom relative to W x H: e.g., zoom=1.2 means we want to see W*1.2 region then stretched to W
    # So crop size = (W*1.6)/zoom ratio ? Wait logic:
    # If we have max buffer 1.6 and we want zoom 1.0 -> we crop  W*1.6/1.0? No that would be larger than buffer.
    # Alternative mental: At zoom 1.0, we want to show exactly W x H region from center of max buffer.
    # At zoom 1.2, we want to show smaller region (W/1.2) scaled up -> but we have max buffer larger, so we can crop smaller.
    # Actually we can think: base max buffer represents 1.6 zoom. To get zoom 1.0, we need crop size = (W*1.6)/1.0 ??? No max is 1.6, so W*1.6 at zoom 1.6 corresponds to W.
    # So mapping: crop_w = (W * COVER_SCALE_MAX) / zoom
    # For zoom 1.0, crop_w = W*1.6
    # For zoom 1.6, crop_w = W*1.6/1.6 = W
    # So correct.

    # Similarly for bg
    bw, bh = bg_max.size
    # compute crop for bg (slightly less zoom to keep parallax)
    bg_zoom = zoom * 0.85 + 0.15  # bg moves less
    bg_zoom = max(1.0, bg_zoom)
    bg_crop_w = int((W*COVER_SCALE_MAX)/bg_zoom)
    bg_crop_h = int((H*COVER_SCALE_MAX)/bg_zoom)
    # clamp to not exceed buffer
    bg_crop_w = min(bg_crop_w, bw)
    bg_crop_h = min(bg_crop_h, bh)
    # center with shake offset (bg shake half)
    bg_cx = bw//2 + int(shake_x*0.3)
    bg_cy = bh//2 + int(shake_y*0.3)
    bg_x0 = max(0, min(bw - bg_crop_w, bg_cx - bg_crop_w//2))
    bg_y0 = max(0, min(bh - bg_crop_h, bg_cy - bg_crop_h//2))
    bg_cropped = bg_max.crop((bg_x0, bg_y0, bg_x0+bg_crop_w, bg_y0+bg_crop_h))
    bg_frame = bg_cropped.resize((W,H), Image.LANCZOS)

    # For fg, use base cover max
    fw, fh = base_cover.size
    fg_crop_w = int((W*COVER_SCALE_MAX)/zoom)
    fg_crop_h = int((H*COVER_SCALE_MAX)/zoom)
    fg_crop_w = min(fg_crop_w, fw)
    fg_crop_h = min(fg_crop_h, fh)
    fg_cx = fw//2 + int(shake_x)
    fg_cy = fh//2 + int(shake_y)
    fg_x0 = max(0, min(fw - fg_crop_w, fg_cx - fg_crop_w//2))
    fg_y0 = max(0, min(fh - fg_crop_h, fg_cy - fg_crop_h//2))
    fg_cropped = base_cover.crop((fg_x0, fg_y0, fg_x0+fg_crop_w, fg_y0+fg_crop_h))
    fg_resized = fg_cropped.resize((W,H), Image.LANCZOS)

    # Apply CC to fg_resized
    # Enhance
    enhancer = ImageEnhance.Brightness(fg_resized)
    fg_cc = enhancer.enhance(cc_brightness)
    enhancer = ImageEnhance.Contrast(fg_cc)
    fg_cc = enhancer.enhance(cc_contrast)
    enhancer = ImageEnhance.Color(fg_cc)
    fg_cc = enhancer.enhance(cc_color)
    # Add slight purple tint for JJ aesthetic (increase red/blue)
    # Blend with color overlay
    # For high intensity, add magenta tint
    if intensity != "low":
        # create tint
        tint = Image.new("RGB", (W,H), (255, 110, 180) if intensity=="high" else (200, 140, 255))
        # blend very subtle 0.08
        alpha = 0.07 if intensity=="high" else 0.05
        fg_cc = Image.blend(fg_cc, Image.blend(fg_cc, tint, alpha), 1.0)

    # Apply rotation if needed (small)
    if abs(rot) > 0.3:
        # rotate fg_cc around center before mask composite? We'll rotate after composite to keep border aligned? Better rotate fg_cc alone then re-crop
        fg_cc = fg_cc.rotate(rot, resample=Image.BICUBIC, expand=False, fillcolor=(0,0,0))

    # Composite: bg_frame is background, fg_cc is foreground but we want masked rounded rect
    # Create output: start with bg_frame
    out = bg_frame.copy().convert("RGBA")
    # fg with mask
    fg_rgba = fg_cc.convert("RGBA")
    # apply mask
    # mask_full is L 0-255
    # we need to composite fg_rgba onto out using mask
    out.paste(fg_rgba, (0,0), mask_full)

    # Add border on top
    out = Image.alpha_composite(out, border_rgba)

    # Flash effect on beat
    # flash alpha decays quickly
    flash_alpha = max(0, 0.35 * math.exp(-since*18)) if intensity != "low" else max(0, 0.18 * math.exp(-since*20))
    # Additionally, for high, add white flash at very new beat
    if since < 0.06:
        # add extra flash
        flash_layer = Image.new("RGBA", (W,H), (255,255,255,int(255*flash_alpha)))
        out = Image.alpha_composite(out, flash_layer)
    elif flash_alpha > 0.02:
        flash_layer = Image.new("RGBA", (W,H), (255,255,255,int(255*flash_alpha*0.6)))
        out = Image.alpha_composite(out, flash_layer)

    # Vignette? Add subtle dark vignette
    # Could skip

    # Convert to RGB for video
    out_rgb = out.convert("RGB")

    # Draw overlays (text)
    draw_out = ImageDraw.Draw(out_rgb)
    # Top left 9:16 label with TikTok style
    # We'll use PIL default font or loaded
    try:
        if font_path:
            font_small = ImageFont.truetype(font_path, 36)
            font_tiny = ImageFont.truetype(font_path, 28)
            font_wm = ImageFont.truetype(font_path, 32)
        else:
            font_small = ImageFont.load_default()
            font_tiny = ImageFont.load_default()
            font_wm = ImageFont.load_default()
    except:
        font_small = ImageFont.load_default()
        font_tiny = ImageFont.load_default()
        font_wm = ImageFont.load_default()

    # Draw TikTok logo imitation top left
    # Simple text: "TikTok @einnpreset" as in original, but we keep for aesthetic
    # top left corner: 9:16 label
    # Position 40,70
    # Create semi-transparent bg for text? Just text with shadow
    txt_916 = "9:16"
    # shadow
    draw_out.text((42, 72), txt_916, font=font_small, fill=(0,0,0,128))
    draw_out.text((40, 70), txt_916, font=font_small, fill=(255,255,255))
    # Smaller TikTok tag top
    # draw_out.text((40, 34), "TikTok @einnpreset", font=font_tiny, fill=(255,255,255))

    # Bottom watermarks like original: "55 @einnpreset #clanP55" and "GP @einnpreset"
    # We'll replicate near bottom center
    bottom_y = H - 90
    # Draw semi-transparent bar? Keep simple
    # Example: left 55 logo imitation
    wm_text1 = "55  @einnpreset #clanP55"
    wm_text2 = "GP  @einnpreset"
    # center both roughly
    # We'll draw them side by side near bottom
    # Use shadow
    draw_out.text((42, bottom_y+2), wm_text1, font=font_tiny, fill=(0,0,0))
    draw_out.text((40, bottom_y), wm_text1, font=font_tiny, fill=(255,255,255))
    # right side
    draw_out.text((W//2 + 40 +2, bottom_y+2), wm_text2, font=font_tiny, fill=(0,0,0))
    draw_out.text((W//2 + 40, bottom_y), wm_text2, font=font_tiny, fill=(255,255,255))

    # TikTok bottom right for later part (like original moves)
    if t > 6:
        # small TikTok logo bottom right
        tiktok_txt = "TikTok @einnpreset"
        tr_w = W - 360
        tr_y = H - 90
        draw_out.text((tr_w+2, tr_y+2), tiktok_txt, font=font_tiny, fill=(0,0,0))
        draw_out.text((tr_w, tr_y), tiktok_txt, font=font_tiny, fill=(255,255,255))

    # Optional add beat counter or "JJ" text in middle for hype (only high intensity)
    if intensity == "high" and since < 0.15:
        # add large "ZA WARUDO" flash like JoJo
        # We'll add text center top
        mid_txt = "ZA WARUDO"
        # large font
        try:
            big_font = ImageFont.truetype(font_path, 90) if font_path else ImageFont.load_default()
        except:
            big_font = ImageFont.load_default()
        # measure
        bbox = draw_out.textbbox((0,0), mid_txt, font=big_font)
        tw = bbox[2]-bbox[0]
        th = bbox[3]-bbox[1]
        cx = W//2 - tw//2
        cy = H//2 - 200
        # draw with outline
        for dx in [-3,-2,-1,0,1,2,3]:
            for dy in [-3,-2,-1,0,1,2,3]:
                draw_out.text((cx+dx, cy+dy), mid_txt, font=big_font, fill=(0,0,0))
        draw_out.text((cx, cy), mid_txt, font=big_font, fill=(255,220,0))

    # outro fade? At end fade to black
    if t > DURATION - 0.8:
        fade = (t - (DURATION - 0.8))/0.8
        fade = max(0, min(1,fade))
        # blend to black
        black = Image.new("RGB", (W,H), (0,0,0))
        out_rgb = Image.blend(out_rgb, black, fade)

    # return numpy
    return np.array(out_rgb)

# Generate video frames using ffmpeg pipe
# Instead of moviepy, we stream raw frames to ffmpeg
import tempfile, pathlib
output_path = "/home/user/za-warudo/jj_output_9x16.mp4"
audio_path = "/tmp/audio.wav"
# also original audio aac for better quality? Use wav
# Check ffmpeg exists
print(f"Using ffmpeg {FFMPEG}")

# Start ffmpeg process
cmd = [
    FFMPEG, "-y",
    "-f", "rawvideo",
    "-vcodec", "rawvideo",
    "-pix_fmt", "rgb24",
    "-s", f"{W}x{H}",
    "-r", str(FPS),
    "-i", "-",  # stdin video
    "-i", audio_path,
    "-c:v", "libx264",
    "-pix_fmt", "yuv420p",
    "-preset", "medium",
    "-crf", "18",
    "-c:a", "aac",
    "-b:a", "128k",
    "-shortest",
    "-movflags", "+faststart",
    output_path
]
print(" ".join(cmd))
proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)

total_frames = int(DURATION * FPS)
print(f"Generating {total_frames} frames...")
for i in range(total_frames):
    t = i / FPS
    frame = make_frame(t)
    # frame is RGB uint8
    proc.stdin.write(frame.tobytes())
    if i % 30 == 0:
        print(f"frame {i}/{total_frames} t={t:.2f}s")
proc.stdin.close()
proc.wait()
print(f"Done, retcode {proc.returncode}")
if os.path.exists(output_path):
    print(f"Output exists {os.path.getsize(output_path)} bytes")

/**
 * Menu.ts — main menu, garage, settings, controls, credits (§10).
 *
 * Semua layar adalah DOM murni. Tidak ada tombol mati: setiap item melakukan
 * sesuatu yang nyata.
 */

import { CARS, RIVALS, carById, AUDIO, CAMERA, PHYSICS, AI } from "../sim/Tuning";
import type { SaveManager, Settings } from "../core/Save";
import { upgradeCost } from "../core/Save";

export interface MenuCallbacks {
  onStartRace(mode: RaceModeKey, rivalId: string): void;
  onSelectCar(carId: string): void;
  onBuyUpgrade(carId: string, kind: "tire" | "susp" | "lsd" | "engine"): void;
  onSettingsChange(patch: Partial<Settings>): void;
  onOpen(screen: "menu" | "garage" | "settings" | "controls" | "credits"): void;
  onHover(): void;
  onConfirm(): void;
  onBack(): void;
}

export type RaceModeKey = "downhill" | "uphill" | "timeattack" | "tofu";

export class Menu {
  private root: HTMLElement;
  private save: SaveManager;
  private cb: MenuCallbacks;
  private screens = new Map<string, HTMLElement>();

  constructor(parent: HTMLElement, save: SaveManager, cb: MenuCallbacks) {
    this.root = document.createElement("div");
    this.root.className = "screen hidden";
    this.root.id = "menu-root";
    parent.appendChild(this.root);
    this.save = save;
    this.cb = cb;
    this.buildMenu();
    this.buildGarage();
    this.buildSettings();
    this.buildControls();
    this.buildCredits();
  }

  /** Menampilkan satu layar, menyembunyikan yang lain. */
  show(screen: "menu" | "garage" | "settings" | "controls" | "credits" | null): void {
    if (!screen) {
      this.root.classList.add("hidden");
      return;
    }
    this.root.classList.remove("hidden");
    for (const [key, el] of this.screens) {
      el.classList.toggle("hidden", key !== screen);
    }
    if (screen === "garage") this.refreshGarage();
    if (screen === "settings") this.refreshSettings();
    this.cb.onOpen(screen);
  }

  private screenEl(id: string): HTMLElement {
    const el = document.createElement("div");
    el.className = "panel pad scroll";
    el.style.maxWidth = "980px";
    el.style.margin = "0 auto";
    el.style.width = "100%";
    el.style.maxHeight = "calc(100% - 40px)";
    this.root.appendChild(el);
    this.screens.set(id, el);
    return el;
  }

  private hook(el: Element | null): void {
    el?.addEventListener("pointerenter", () => this.cb.onHover());
  }

  /* ---------------- menu utama ---------------- */
  private buildMenu(): void {
    const el = this.screenEl("menu");
    el.innerHTML = `
      <h2 class="screen-title">EUROBEAT DRIFT LEGEND</h2>
      <p class="screen-sub">Gunma Downhill · malam · 5.06 km</p>
      <div class="menu-grid"></div>
      <div class="row between" style="margin-top:18px;font-size:11px;letter-spacing:.1em;color:var(--dim)">
        <span id="menu-cash">¥0</span>
        <span id="menu-progress">0/6 week</span>
      </div>`;
    const grid = el.querySelector(".menu-grid")!;

    const items: { label: string; tag: string; action: () => void }[] = [
      { label: "Downhill Battle", tag: "1 rival · menang di finish", action: () => this.startRace("downhill") },
      { label: "Uphill Battle", tag: "jalur terbalik · rival lebih kuat", action: () => this.startRace("uphill") },
      { label: "Time Attack", tag: "sendirian · lawan waktu", action: () => this.startRace("timeattack") },
      { label: "Tofu Delivery", tag: "santai · jangan tumpah", action: () => this.startRace("tofu") },
      { label: "Garage", tag: "mobil & upgrade", action: () => this.show("garage") },
      { label: "Settings", tag: "volume · kualitas · aksesibilitas", action: () => this.show("settings") },
      { label: "Kontrol", tag: "keyboard · gamepad · touch", action: () => this.show("controls") },
      { label: "Credits", tag: "tentang game ini", action: () => this.show("credits") },
    ];
    for (const item of items) {
      const btn = document.createElement("button");
      btn.className = "btn menu-item";
      btn.innerHTML = `<span>${item.label}</span><span class="tag">${item.tag}</span>`;
      btn.addEventListener("click", () => {
        this.cb.onConfirm();
        item.action();
      });
      this.hook(btn);
      grid.appendChild(btn);
    }
  }

  private startRace(mode: RaceModeKey): void {
    const beatRivals = this.save.data.progress.rivalsBeaten;
    const rival = RIVALS.find((r) => !beatRivals.includes(r.id)) ?? RIVALS[0]!;
    this.cb.onStartRace(mode, rival.id);
  }

  refreshMenu(): void {
    const el = this.screens.get("menu");
    if (!el) return;
    const cash = el.querySelector("#menu-cash");
    const prog = el.querySelector("#menu-progress");
    if (cash) cash.textContent = `¥${this.save.data.progress.cash.toLocaleString("id-ID")}`;
    if (prog) prog.textContent = `${this.save.data.progress.weeksCleared.length}/6 week`;
  }

  /* ---------------- garage ---------------- */
  private selectedCar = "hachi86";

  private buildGarage(): void {
    const el = this.screenEl("garage");
    el.innerHTML = `
      <h2 class="screen-title">Garage</h2>
      <p class="screen-sub">Pilih mobil · upgrade dengan cuan</p>
      <div class="garage-wrap">
        <div>
          <div class="car-list"></div>
          <div class="row between" style="margin-top:10px">
            <span style="font-size:12px;color:var(--dim)">Cuan: <b id="g-cash">¥0</b></span>
            <button class="btn btn-sm" data-act="back">Kembali</button>
          </div>
        </div>
        <div class="panel pad" style="background:rgba(8,13,28,.5)">
          <div id="g-detail"></div>
        </div>
      </div>`;
    el.querySelector('[data-act="back"]')!.addEventListener("click", () => {
      this.cb.onBack();
      this.show("menu");
    });
  }

  refreshGarage(): void {
    const el = this.screens.get("garage");
    if (!el) return;
    this.selectedCar = this.save.data.progress.selectedCar;
    const list = el.querySelector(".car-list")!;
    list.innerHTML = "";
    for (const spec of CARS) {
      const unlocked = this.save.data.progress.unlockedCars.includes(spec.id);
      const card = document.createElement("div");
      card.className = `car-card${spec.id === this.selectedCar ? " sel" : ""}${unlocked ? "" : " locked"}`;
      card.innerHTML = `
        <span class="car-swatch" style="background:#${spec.color.toString(16).padStart(6, "0")}"></span>
        <div class="car-meta">
          <b>${spec.name}</b>
          <span>${spec.subtitle}${unlocked ? "" : " · TERKUNCI"}</span>
        </div>`;
      if (unlocked) {
        card.addEventListener("click", () => {
          this.cb.onConfirm();
          this.selectedCar = spec.id;
          this.save.updateProgress({ selectedCar: spec.id });
          this.cb.onSelectCar(spec.id);
          this.refreshGarage();
        });
        this.hook(card);
      }
      list.appendChild(card);
    }
    const cashEl = el.querySelector("#g-cash");
    if (cashEl) cashEl.textContent = `¥${this.save.data.progress.cash.toLocaleString("id-ID")}`;
    this.renderDetail(el.querySelector("#g-detail") as HTMLElement);
  }

  private renderDetail(container: HTMLElement): void {
    const spec = carById(this.selectedCar);
    const upg = this.save.data.progress.upgrades[spec.id] ?? { tire: 0, susp: 0, lsd: 0, engine: 0 };
    const cash = this.save.data.progress.cash;
    const unlocked = this.save.data.progress.unlockedCars.includes(spec.id);

    const stat = (label: string, value: number, max = 100) => `
      <div class="stat-row">
        <span>${label}</span>
        <span class="stat-bar"><i style="width:${Math.min(100, (value / max) * 100)}%"></i></span>
        <span style="text-align:right">${Math.round(value)}</span>
      </div>`;

    const upgRow = (key: "tire" | "susp" | "lsd" | "engine", label: string) => {
      const lvl = upg[key];
      const cost = upgradeCost(lvl);
      const dots = Array.from({ length: 4 }, (_, i) => `<i class="${i < lvl ? "on" : ""}"></i>`).join("");
      return `<div class="upg-row">
        <span>${label}</span>
        <span class="upg-dots">${dots}</span>
        <button class="btn btn-sm" data-upg="${key}" ${lvl >= 4 || cash < cost || !unlocked ? "disabled" : ""}>
          ${lvl >= 4 ? "MAX" : `¥${cost.toLocaleString("id-ID")}`}
        </button>
      </div>`;
    };

    container.innerHTML = `
      <h3 style="margin:0 0 2px;font-size:18px;letter-spacing:.06em">${spec.name}</h3>
      <p style="margin:0 0 12px;font-size:11px;color:var(--dim);letter-spacing:.08em">${spec.subtitle}</p>
      ${stat("POWER", (spec.powerHp / 260) * 100 + upg.engine * 6)}
      ${stat("GRIP", (spec.gripScale - 0.9) * 400 + upg.tire * 8)}
      ${stat("DRIFT", spec.driftBias * 60 + upg.lsd * 7)}
      ${stat("BERAT", 100 - (spec.mass - 900) / 5)}
      <div style="margin:14px 0 6px;font-size:11px;letter-spacing:.18em;color:var(--dim)">UPGRADE</div>
      ${upgRow("tire", "Ban")}
      ${upgRow("susp", "Suspensi")}
      ${upgRow("lsd", "LSD")}
      ${upgRow("engine", "Mesin")}
      <p style="margin-top:12px;font-size:10px;color:var(--dim);line-height:1.5">
        Ban → grip belok. Suspensi → transfer berat. LSD → sudut drift. Mesin → tenaga.
      </p>`;

    for (const key of ["tire", "susp", "lsd", "engine"] as const) {
      container.querySelector(`[data-upg="${key}"]`)?.addEventListener("click", () => {
        this.cb.onConfirm();
        this.cb.onBuyUpgrade(spec.id, key);
        this.refreshGarage();
      });
    }
  }

  /* ---------------- settings ---------------- */
  private buildSettings(): void {
    const el = this.screenEl("settings");
    el.innerHTML = `<h2 class="screen-title">Settings</h2><p class="screen-sub">Semua tersimpan otomatis</p><div id="s-body"></div>
      <div class="row" style="margin-top:14px"><button class="btn btn-sm" data-act="back">Kembali</button></div>`;
    el.querySelector('[data-act="back"]')!.addEventListener("click", () => {
      this.cb.onBack();
      this.show("menu");
    });
  }

  refreshSettings(): void {
    const el = this.screens.get("settings");
    if (!el) return;
    const s = this.save.data.settings;
    const body = el.querySelector("#s-body")!;
    const slider = (key: keyof Settings, label: string) => `
      <div class="setting"><label>${label}</label>
        <input type="range" min="0" max="100" value="${Math.round((s[key] as number) * 100)}" data-slider="${key}" />
        <span style="width:38px;text-align:right">${Math.round((s[key] as number) * 100)}%</span>
      </div>`;
    const pills = (key: keyof Settings, label: string, options: { v: string; l: string }[]) => `
      <div class="setting"><label>${label}</label>
        <div class="pill-row">${options
          .map((o) => `<button class="pill${s[key] === o.v ? " sel" : ""}" data-pill="${key}" data-v="${o.v}">${o.l}</button>`)
          .join("")}</div>
      </div>`;
    const toggle = (key: keyof Settings, label: string) => `
      <div class="setting"><label>${label}</label>
        <button class="pill${s[key] ? " sel" : ""}" data-toggle="${key}">${s[key] ? "ON" : "OFF"}</button>
      </div>`;

    body.innerHTML = `
      ${slider("masterVolume", "Volume master")}
      ${slider("musicVolume", "Volume musik")}
      ${slider("sfxVolume", "Volume efek")}
      ${pills("quality", "Kualitas grafis", [
        { v: "low", l: "LOW" },
        { v: "medium", l: "MED" },
        { v: "high", l: "HIGH" },
      ])}
      ${pills("cameraMode", "Kamera", [
        { v: "chase", l: "CHASE" },
        { v: "bumper", l: "BUMPER" },
        { v: "hood", l: "HOOD" },
      ])}
      ${slider("cameraSensitivity", "Sensitivitas kamera")}
      ${slider("hudScale", "Skala HUD")}
      ${toggle("invertSteer", "Invert setir")}
      ${toggle("subtitles", "Subtitle dialog")}
      ${toggle("reduceMotion", "Kurangi gerakan")}
      ${toggle("colorblindSafe", "Mode buta warna")}
      <div style="margin-top:16px;display:flex;gap:8px">
        <button class="btn btn-sm" data-act="reset-save">Reset save</button>
        <span style="font-size:10px;color:var(--dim);align-self:center">
          ${this.save.isAvailable ? "localStorage aktif" : "localStorage tidak tersedia — progres tidak tersimpan"}
        </span>
      </div>`;

    for (const input of Array.from(body.querySelectorAll<HTMLInputElement>("[data-slider]"))) {
      input.addEventListener("input", () => {
        const key = input.dataset.slider as keyof Settings;
        const val = Number(input.value) / 100;
        const span = input.nextElementSibling as HTMLElement | null;
        if (span) span.textContent = `${Math.round(val * 100)}%`;
        this.cb.onSettingsChange({ [key]: val } as Partial<Settings>);
      });
    }
    for (const btn of Array.from(body.querySelectorAll<HTMLElement>("[data-pill]"))) {
      btn.addEventListener("click", () => {
        const key = btn.dataset.pill as keyof Settings;
        const v = btn.dataset.v!;
        this.cb.onConfirm();
        this.cb.onSettingsChange({ [key]: v } as Partial<Settings>);
        this.refreshSettings();
      });
    }
    for (const btn of Array.from(body.querySelectorAll<HTMLElement>("[data-toggle]"))) {
      btn.addEventListener("click", () => {
        const key = btn.dataset.toggle as keyof Settings;
        this.cb.onConfirm();
        this.cb.onSettingsChange({ [key]: !this.save.data.settings[key] } as Partial<Settings>);
        this.refreshSettings();
      });
    }
    body.querySelector('[data-act="reset-save"]')?.addEventListener("click", () => {
      this.save.resetAll();
      this.refreshSettings();
      this.refreshMenu();
    });
  }

  /* ---------------- controls ---------------- */
  private buildControls(): void {
    const el = this.screenEl("controls");
    el.innerHTML = `
      <h2 class="screen-title">Kontrol</h2>
      <p class="screen-sub">Keyboard (layout-independent) · gamepad · touch</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;font-size:12px;line-height:2">
        <div>
          <div><span class="kbd">W</span><span class="kbd">↑</span> Gas</div>
          <div><span class="kbd">S</span><span class="kbd">↓</span> Rem</div>
          <div><span class="kbd">A</span><span class="kbd">D</span> / <span class="kbd">←</span><span class="kbd">→</span> Setir</div>
          <div><span class="kbd">SPACE</span> Handbrake / drift</div>
          <div><span class="kbd">C</span> Ganti kamera</div>
          <div><span class="kbd">R</span> Restart race</div>
          <div><span class="kbd">ESC</span> Pause</div>
        </div>
        <div>
          <div><b>Gamepad</b> (deadzone ${Math.round(0.12 * 100)}%)</div>
          <div>RT gas · LT rem · A konfirmasi</div>
          <div>X handbrake · Y kamera · START pause</div>
          <div style="margin-top:10px"><b>Touch</b></div>
          <div>Kiri: setir · Kanan: gas/rem · Drift besar di tengah</div>
          <div style="margin-top:14px;font-size:10px;color:var(--dim)">
            Input memakai <code>event.code</code>, jadi aman untuk QWERTY, AZERTY, dan layout lain.
          </div>
        </div>
      </div>
      <div class="row" style="margin-top:16px"><button class="btn btn-sm" data-act="back">Kembali</button></div>`;
    el.querySelector('[data-act="back"]')!.addEventListener("click", () => {
      this.cb.onBack();
      this.show("menu");
    });
  }

  /* ---------------- credits ---------------- */
  private buildCredits(): void {
    const el = this.screenEl("credits");
    el.innerHTML = `
      <h2 class="screen-title">Credits</h2>
      <p class="screen-sub">100% prosedural · tanpa aset eksternal</p>
      <div style="font-size:12px;line-height:1.9;max-width:620px">
        <p><b>EUROBEAT DRIFT LEGEND — Gunma Downhill</b><br/>
        Arcade drift racer sebagai penghormatan pada budaya touge Jepang dan anime
        balap 90-an. Semua mobil, sirkuit, karakter, musik, dan suara dibuat
        secara prosedural di dalam game.</p>
        <p>Mesin: Three.js (WebGL2) · Web Audio API · Vite + TypeScript.<br/>
        Tanpa file .glb/.mp3/.png eksternal. Semua mesh dari geometri,
        semua tekstur dari canvas/shader, semua audio dari oscillator,
        noise buffer, dan impulse response sintetis.</p>
        <p style="color:var(--dim);font-size:11px">
        Semua nama mobil fiktif (HACHI 86, FD-7 SAVANNA, EK-9 TYPE-R, NISSAN-KAI S13).
        Musik orisinal, bukan lagu Eurobeat berlisensi. Untuk tujuan demonstrasi
        teknis dan nostalgia.</p>
        <p style="font-size:11px;color:var(--dim)">
        Nilai tuning aktif: μ=${PHYSICS.TIRE_PEAK_MU} · yaw inject=${PHYSICS.HANDBRAKE_YAW_INJECT}
        · countersteer=${PHYSICS.COUNTERSTEER_DAMPING} · AI skill=${AI.AI_SKILL_BASE}
        · kamera k=${CAMERA.CAM_SPRING_K} · BPM=${AUDIO.BPM_BASE}</p>
      </div>
      <div class="row" style="margin-top:16px"><button class="btn btn-sm" data-act="back">Kembali</button></div>`;
    el.querySelector('[data-act="back"]')!.addEventListener("click", () => {
      this.cb.onBack();
      this.show("menu");
    });
  }
}

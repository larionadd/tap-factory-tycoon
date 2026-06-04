(function () {
  "use strict";

  const SAVE_KEY = "tapFactoryTycoonSaveV01";
  const VERSION = "0.1.0";
  const AUTOSAVE_MS = 2500;
  const MAX_OFFLINE_SECONDS = 7200;

  const CONFIG = {
    leaderboardGuide: "Grow your factory this week",
    crazyGamesEncryptionKey: window.TAP_FACTORY_CG_KEY || "",
    scoreSubmitCooldownMs: 30000,
    branchEarnedRequirement: 50000,
  };

  const I18N = {
    en: {
      gameTitle: "Tap Factory Tycoon",
      reset: "Reset",
      money: "Money",
      stock: "Stock",
      flow: "Flow",
      weeklyRating: "Weekly Rating",
      tap: "TAP",
      currentContract: "Current Contract",
      upgrades: "Upgrades",
      managers: "Managers",
      contracts: "Contracts",
      rank: "Rank",
      upgradeLine: "Upgrade Line",
      hireManagers: "Hire Managers",
      weeklyContracts: "Weekly Contracts",
      leaderboard: "Leaderboard",
      localBest: "Local Best",
      submittedBest: "Submitted Best",
      platform: "Platform",
      submitScore: "Submit Score",
      openBranch: "Open Branch",
      max: "MAX",
      buy: "Buy",
      hire: "Hire",
      level: "Lv",
      cost: "Cost",
      reward: "Reward",
      rating: "rating",
      completed: "Completed",
      starterTier: "Starter Line",
      growingTier: "Growing Shop",
      automatedTier: "Automated Floor",
      exportTier: "Export Factory",
      branchTier: "Branch Network",
      upgradesBought: "levels",
      managersHired: "hires",
      contractsDone: "done",
      sdkDisabled: "SDK disabled",
      sdkLocal: "SDK local",
      sdkReady: "SDK ready",
      sdkMissingKey: "Add the CrazyGames encryption key before live submit.",
      submitLocal: "Local score saved. CrazyGames SDK is not active here.",
      submitCooldown: "Score submit cooldown is still active.",
      submitLower: "Current score is not higher than submitted best.",
      submitOk: "Score submitted.",
      submitFailed: "Score submit failed.",
      branchLocked: "Needs $50K total earned.",
      branchOpened: "New branch opened.",
      resetConfirm: "Reset all local progress?",
      saved: "Saved",
      offline: "Offline gains added",
      pressName: "Press Power",
      pressDesc: "More crates per tap.",
      conveyorName: "Conveyor Belt",
      conveyorDesc: "Produces crates while you play.",
      warehouseName: "Warehouse Rack",
      warehouseDesc: "Raises stock capacity.",
      packingName: "Packing Desk",
      packingDesc: "Raises value per crate.",
      deliveryName: "Delivery Dock",
      deliveryDesc: "Ships more crates per second.",
      planningName: "Planning Board",
      planningDesc: "Adds rating to contract rewards.",
      foremanName: "Shift Foreman",
      foremanDesc: "Boosts tap and conveyor output.",
      brokerName: "Deal Broker",
      brokerDesc: "Boosts crate value and shipping.",
      engineerName: "Line Engineer",
      engineerDesc: "Reduces future upgrade costs.",
      shipContract: "Ship {target} crates",
      tapContract: "Run {target} taps",
      upgradeContract: "Buy {target} upgrades",
    },
    uk: {
      gameTitle: "Tap Factory Tycoon",
      reset: "Скинути",
      money: "Гроші",
      stock: "Склад",
      flow: "Потік",
      weeklyRating: "Тижневий рейтинг",
      tap: "ТАП",
      currentContract: "Поточний контракт",
      upgrades: "Апгрейди",
      managers: "Менеджери",
      contracts: "Контракти",
      rank: "Ранг",
      upgradeLine: "Лінія апгрейдів",
      hireManagers: "Найм менеджерів",
      weeklyContracts: "Тижневі контракти",
      leaderboard: "Таблиця лідерів",
      localBest: "Локальний рекорд",
      submittedBest: "Відправлено",
      platform: "Платформа",
      submitScore: "Відправити рахунок",
      openBranch: "Відкрити філію",
      max: "МАКС",
      buy: "Купити",
      hire: "Найняти",
      level: "Рів",
      cost: "Ціна",
      reward: "Нагорода",
      rating: "рейтинг",
      completed: "Виконано",
      starterTier: "Стартова лінія",
      growingTier: "Малий цех",
      automatedTier: "Автоматизований цех",
      exportTier: "Експортна фабрика",
      branchTier: "Мережа філій",
      upgradesBought: "рівнів",
      managersHired: "наймів",
      contractsDone: "виконано",
      sdkDisabled: "SDK вимкнено",
      sdkLocal: "SDK локально",
      sdkReady: "SDK готовий",
      sdkMissingKey: "Додай CrazyGames encryption key перед live submit.",
      submitLocal: "Локальний рахунок збережено. CrazyGames SDK тут неактивний.",
      submitCooldown: "Cooldown відправки ще активний.",
      submitLower: "Поточний рахунок не вищий за відправлений.",
      submitOk: "Рахунок відправлено.",
      submitFailed: "Не вдалося відправити рахунок.",
      branchLocked: "Потрібно $50K загального доходу.",
      branchOpened: "Нову філію відкрито.",
      resetConfirm: "Скинути весь локальний прогрес?",
      saved: "Збережено",
      offline: "Офлайн-дохід додано",
      pressName: "Сила преса",
      pressDesc: "Більше ящиків за тап.",
      conveyorName: "Конвеєр",
      conveyorDesc: "Виробляє ящики під час гри.",
      warehouseName: "Складська стійка",
      warehouseDesc: "Збільшує місткість складу.",
      packingName: "Пакувальний стіл",
      packingDesc: "Підвищує ціну ящика.",
      deliveryName: "Доставка",
      deliveryDesc: "Відправляє більше ящиків за секунду.",
      planningName: "Планування",
      planningDesc: "Додає рейтинг до контрактів.",
      foremanName: "Керівник зміни",
      foremanDesc: "Підсилює тап і конвеєр.",
      brokerName: "Брокер угод",
      brokerDesc: "Підсилює ціну та доставку.",
      engineerName: "Інженер лінії",
      engineerDesc: "Знижує майбутні ціни апгрейдів.",
      shipContract: "Відправити {target} ящиків",
      tapContract: "Зробити {target} тапів",
      upgradeContract: "Купити {target} апгрейдів",
    },
  };

  const UPGRADES = [
    { id: "press", name: "pressName", desc: "pressDesc", baseCost: 12, growth: 1.42, max: 40 },
    { id: "conveyor", name: "conveyorName", desc: "conveyorDesc", baseCost: 55, growth: 1.5, max: 36 },
    { id: "warehouse", name: "warehouseName", desc: "warehouseDesc", baseCost: 45, growth: 1.38, max: 34 },
    { id: "packing", name: "packingName", desc: "packingDesc", baseCost: 80, growth: 1.48, max: 32 },
    { id: "delivery", name: "deliveryName", desc: "deliveryDesc", baseCost: 95, growth: 1.52, max: 32 },
    { id: "planning", name: "planningName", desc: "planningDesc", baseCost: 140, growth: 1.56, max: 24 },
  ];

  const MANAGERS = [
    { id: "foreman", name: "foremanName", desc: "foremanDesc", baseCost: 500, growth: 2.2, max: 10 },
    { id: "broker", name: "brokerName", desc: "brokerDesc", baseCost: 780, growth: 2.35, max: 10 },
    { id: "engineer", name: "engineerName", desc: "engineerDesc", baseCost: 950, growth: 2.45, max: 8 },
  ];

  const els = {
    moneyValue: document.getElementById("moneyValue"),
    stockValue: document.getElementById("stockValue"),
    flowValue: document.getElementById("flowValue"),
    scoreValue: document.getElementById("scoreValue"),
    tierLabel: document.getElementById("tierLabel"),
    tapButton: document.getElementById("tapButton"),
    tapPowerLabel: document.getElementById("tapPowerLabel"),
    fxLayer: document.getElementById("fxLayer"),
    upgradeList: document.getElementById("upgradeList"),
    managerList: document.getElementById("managerList"),
    contractList: document.getElementById("contractList"),
    activeContractTitle: document.getElementById("activeContractTitle"),
    activeContractProgress: document.getElementById("activeContractProgress"),
    languageButton: document.getElementById("languageButton"),
    resetButton: document.getElementById("resetButton"),
    submitScoreButton: document.getElementById("submitScoreButton"),
    branchButton: document.getElementById("branchButton"),
    leaderboardStatus: document.getElementById("leaderboardStatus"),
    bestScoreValue: document.getElementById("bestScoreValue"),
    submittedScoreValue: document.getElementById("submittedScoreValue"),
    platformValue: document.getElementById("platformValue"),
    sdkPill: document.getElementById("sdkPill"),
    upgradeHint: document.getElementById("upgradeHint"),
    managerHint: document.getElementById("managerHint"),
    contractHint: document.getElementById("contractHint"),
    leaderboardHint: document.getElementById("leaderboardHint"),
    machine: document.querySelector(".machine"),
    workshop: document.querySelector(".workshop"),
    crateStack: document.getElementById("crateStack"),
    toast: document.getElementById("toast"),
  };

  const state = loadState();
  let activeTab = "upgrades";
  let lastFrame = performance.now();
  let lastSave = performance.now();
  let toastTimer = 0;
  let phaserBridge = null;

  const cg = {
    env: "disabled",
    systemInfo: null,
    get sdk() {
      return window.CrazyGames && window.CrazyGames.SDK ? window.CrazyGames.SDK : null;
    },
    async init() {
      await wait(120);
      if (!this.sdk) {
        this.env = "disabled";
        return;
      }
      try {
        this.env = await this.sdk.getEnvironment();
      } catch (_error) {
        this.env = "disabled";
      }
      try {
        this.systemInfo = this.sdk.user && this.sdk.user.systemInfo ? this.sdk.user.systemInfo : null;
      } catch (_error) {
        this.systemInfo = null;
      }
    },
    canUse() {
      return this.sdk && (this.env === "local" || this.env === "crazygames");
    },
    gameplayStart() {
      if (!this.canUse()) return;
      try {
        this.sdk.game.gameplayStart();
      } catch (_error) {
        // CrazyGames calls are best-effort outside the portal.
      }
    },
    setContext() {
      if (!this.canUse()) return;
      try {
        this.sdk.game.setGameContext({
          version: VERSION,
          weeklyScore: String(Math.floor(state.score)),
          branch: String(state.branches),
        });
      } catch (_error) {
        // Context should not interrupt gameplay.
      }
    },
    happytime() {
      if (!this.canUse()) return;
      try {
        this.sdk.game.happytime();
      } catch (_error) {
        // Optional celebration.
      }
    },
    async submitScore(score) {
      if (!this.canUse()) {
        return { ok: false, local: true };
      }
      if (!isValidBase64Key(CONFIG.crazyGamesEncryptionKey)) {
        return { ok: false, missingKey: true };
      }
      const encryptedScore = await encryptScore(score, CONFIG.crazyGamesEncryptionKey);
      await this.sdk.user.submitScore({
        encryptedScore,
        score,
      });
      return { ok: true };
    },
  };

  init();

  function init() {
    normalizeState();
    applyOfflineProgress();
    bindEvents();
    initPhaserStage();
    setLanguage(state.lang || "en", false);
    ensureContracts();
    renderAll();
    cg.init().then(() => {
      renderSdkStatus();
      cg.gameplayStart();
      cg.setContext();
    });
    requestAnimationFrame(loop);
  }

  function bindEvents() {
    els.tapButton.addEventListener("pointerdown", handleTap);
    els.languageButton.addEventListener("click", () => {
      setLanguage(state.lang === "en" ? "uk" : "en", true);
    });
    els.resetButton.addEventListener("click", () => {
      if (window.confirm(t("resetConfirm"))) {
        localStorage.removeItem(SAVE_KEY);
        Object.assign(state, freshState());
        ensureContracts();
        setLanguage("en", false);
        renderAll();
        saveState();
      }
    });
    els.submitScoreButton.addEventListener("click", submitCurrentScore);
    els.branchButton.addEventListener("click", openBranch);
    document.querySelectorAll(".tab-button").forEach((button) => {
      button.addEventListener("click", () => {
        activeTab = button.dataset.tab;
        renderTabs();
      });
    });
    window.addEventListener("beforeunload", saveState);
    window.addEventListener("wheel", (event) => event.preventDefault(), { passive: false });
    window.addEventListener("keydown", (event) => {
      if (["ArrowUp", "ArrowDown", " "].includes(event.key)) {
        event.preventDefault();
      }
    });
  }

  function loop(now) {
    const delta = Math.min(0.2, (now - lastFrame) / 1000);
    lastFrame = now;
    tick(delta);
    if (now - lastSave > AUTOSAVE_MS) {
      saveState();
      lastSave = now;
    }
    renderStats();
    requestAnimationFrame(loop);
  }

  function tick(delta) {
    const produced = productionPerSecond() * delta;
    if (produced > 0) {
      addStock(produced);
    }
    const shipped = Math.min(state.stock, shippingPerSecond() * delta);
    if (shipped > 0) {
      sellCrates(shipped);
    }
    state.lastSeenAt = Date.now();
  }

  function handleTap(event) {
    const crates = tapPower();
    addStock(crates);
    state.totalTaps += 1;
    progressContracts("tap", 1);

    const instantShip = Math.min(state.stock, 1 + level("delivery") * 0.18 + managerLevel("broker") * 0.24);
    let earned = 0;
    if (instantShip > 0) {
      earned = sellCrates(instantShip);
    }

    els.tapButton.classList.add("pressed");
    els.workshop.classList.add("punching");
    els.machine.classList.remove("punch");
    void els.machine.offsetWidth;
    els.machine.classList.add("punch");
    window.setTimeout(() => {
      els.tapButton.classList.remove("pressed");
      els.workshop.classList.remove("punching");
    }, 120);
    spawnFx(event.clientX, event.clientY, earned > 0 ? `+$${formatCompact(earned)}` : `+${Math.floor(crates)}`);
    renderAll();
    syncPhaserState();
  }

  function addStock(amount) {
    if (amount <= 0) return;
    const room = capacity() - state.stock;
    const accepted = Math.max(0, Math.min(room, amount));
    state.stock += accepted;
  }

  function sellCrates(amount) {
    const shipped = Math.min(state.stock, amount);
    if (shipped <= 0) return 0;
    state.stock -= shipped;
    const earned = shipped * crateValue();
    state.money += earned;
    state.totalEarned += earned;
    progressContracts("ship", shipped);
    updateBestScore();
    return earned;
  }

  function buyUpgrade(id) {
    const def = UPGRADES.find((item) => item.id === id);
    if (!def) return;
    const current = level(id);
    if (current >= def.max) return;
    const cost = upgradeCost(def);
    if (state.money < cost) return;
    state.money -= cost;
    state.upgrades[id] = current + 1;
    state.score += Math.round(18 + current * 4 + level("planning") * 3);
    progressContracts("upgrade", 1);
    updateBestScore();
    renderAll();
    saveState();
    syncPhaserState();
  }

  function hireManager(id) {
    const def = MANAGERS.find((item) => item.id === id);
    if (!def) return;
    const current = managerLevel(id);
    if (current >= def.max) return;
    const cost = managerCost(def);
    if (state.money < cost) return;
    state.money -= cost;
    state.managers[id] = current + 1;
    state.score += Math.round(90 + current * 35);
    updateBestScore();
    renderAll();
    saveState();
    syncPhaserState();
  }

  function openBranch() {
    if (state.totalEarned < CONFIG.branchEarnedRequirement) {
      showToast(t("branchLocked"));
      return;
    }

    state.branches += 1;
    state.score += 2000 + state.branches * 500;
    state.money = 0;
    state.stock = 0;
    state.totalEarned = 0;
    state.upgrades = createLevelMap(UPGRADES);
    state.managers = createLevelMap(MANAGERS);
    state.contracts = [];
    ensureContracts();
    updateBestScore();
    cg.happytime();
    showToast(t("branchOpened"));
    renderAll();
    saveState();
    syncPhaserState();
  }

  async function submitCurrentScore() {
    const score = Math.floor(state.score);
    const now = Date.now();
    if (score <= state.submittedBest) {
      showLeaderboardStatus(t("submitLower"));
      return;
    }
    if (now - state.lastSubmitAt < CONFIG.scoreSubmitCooldownMs) {
      showLeaderboardStatus(t("submitCooldown"));
      return;
    }

    els.submitScoreButton.disabled = true;
    try {
      const result = await cg.submitScore(score);
      state.lastSubmitAt = now;
      if (result.ok || result.local) {
        state.submittedBest = Math.max(state.submittedBest, score);
        showLeaderboardStatus(result.local ? t("submitLocal") : t("submitOk"));
      } else if (result.missingKey) {
        showLeaderboardStatus(t("sdkMissingKey"));
      } else {
        showLeaderboardStatus(t("submitFailed"));
      }
      saveState();
      renderRank();
    } catch (_error) {
      showLeaderboardStatus(t("submitFailed"));
    } finally {
      els.submitScoreButton.disabled = false;
    }
  }

  function ensureContracts() {
    while (state.contracts.length < 3) {
      state.contracts.push(createContract());
    }
  }

  function createContract() {
    const index = state.contractSeed++;
    const type = ["ship", "tap", "upgrade"][index % 3];
    const scale = 1 + state.completedContracts * 0.16 + state.branches * 0.5;
    const targets = {
      ship: Math.round(28 * scale + index * 4),
      tap: Math.round(18 * scale + index * 3),
      upgrade: Math.max(2, Math.round(2 + state.completedContracts * 0.12)),
    };
    const target = targets[type];
    const rewardMoney = Math.round((target * crateValue() * 2.2 + 45) * (1 + state.branches * 0.25));
    const rewardScore = Math.round((160 + target * (type === "upgrade" ? 55 : 3)) * contractScoreMultiplier());
    return {
      id: `${Date.now()}-${index}`,
      type,
      target,
      progress: 0,
      rewardMoney,
      rewardScore,
    };
  }

  function progressContracts(type, amount) {
    let changed = false;
    state.contracts.forEach((contract) => {
      if (contract.type === type) {
        contract.progress = Math.min(contract.target, contract.progress + amount);
        changed = true;
      }
    });
    if (changed) {
      completeReadyContracts();
    }
  }

  function completeReadyContracts() {
    let completedAny = false;
    state.contracts = state.contracts.map((contract) => {
      if (contract.progress < contract.target) {
        return contract;
      }
      state.money += contract.rewardMoney;
      state.score += contract.rewardScore;
      state.completedContracts += 1;
      completedAny = true;
      return createContract();
    });
    if (completedAny) {
      updateBestScore();
      cg.setContext();
      if (state.completedContracts % 5 === 0) {
        cg.happytime();
      }
    }
  }

  function renderAll() {
    renderText();
    renderStats();
    renderUpgrades();
    renderManagers();
    renderContracts();
    renderRank();
    renderTabs();
    renderSdkStatus();
  }

  function renderText() {
    document.documentElement.lang = state.lang;
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });
    els.languageButton.textContent = state.lang === "en" ? "UA" : "EN";
    els.tierLabel.textContent = tierLabel();
  }

  function renderStats() {
    const cap = capacity();
    els.moneyValue.textContent = `$${formatCompact(state.money)}`;
    els.stockValue.textContent = `${formatCompact(state.stock)}/${formatCompact(cap)}`;
    els.flowValue.textContent = `${formatCompact(productionPerSecond())}/s / ${formatCompact(shippingPerSecond())}/s`;
    els.scoreValue.textContent = formatCompact(state.score);
    els.tapPowerLabel.textContent = `+${formatCompact(tapPower())}`;
    els.tierLabel.textContent = tierLabel();
    els.crateStack.classList.toggle("full", state.stock / cap > 0.65);
    syncPhaserState();
  }

  function initPhaserStage() {
    const mount = document.getElementById("phaserStage");
    if (!mount || !window.Phaser) {
      document.documentElement.classList.add("no-phaser");
      return;
    }

    const Phaser = window.Phaser;
    const tapFromCanvas = (pointer) => {
      const rect = mount.getBoundingClientRect();
      const clientX = rect.left + pointer.x;
      const clientY = rect.top + pointer.y;
      handleTap({ clientX, clientY });
    };

    class FactoryScene extends Phaser.Scene {
      constructor() {
        super("FactoryScene");
        this.sceneArt = null;
        this.tapArt = null;
        this.machinePulse = null;
        this.beltDots = [];
        this.hudText = null;
      }

      preload() {
        this.load.image("factoryScene", "assets/cartoon/factory-scene.png");
        this.load.image("tapButtonArt", "assets/cartoon/tap-button-art.png");
        this.load.image("coinsArt", "assets/cartoon/coins.png");
      }

      create() {
        this.cameras.main.setBackgroundColor("#3d4969");
        this.sceneArt = this.add.image(195, 272, "factoryScene");
        this.sceneArt.setDisplaySize(390, 540);
        this.sceneArt.setOrigin(0.5);

        this.machinePulse = this.add.graphics();
        this.drawMachinePulse(0.12);

        for (let index = 0; index < 8; index += 1) {
          const dot = this.add.circle(52 + index * 38, 421, 4, 0xfff0b0, 0.58);
          this.beltDots.push(dot);
        }

        this.tapArt = this.add.image(195, 470, "tapButtonArt");
        this.tapArt.setDisplaySize(154, 72);
        this.tapArt.setInteractive({ useHandCursor: true });
        this.tapArt.on("pointerdown", (pointer) => {
          this.pressTapArt();
          tapFromCanvas(pointer);
        });

        this.hudText = this.add.text(195, 526, "", {
          align: "center",
          color: "#fff6d7",
          fontFamily: "Trebuchet MS, Arial, sans-serif",
          fontSize: "14px",
          fontStyle: "bold",
          stroke: "#2a1830",
          strokeThickness: 4,
        });
        this.hudText.setOrigin(0.5);

        this.input.on("pointerdown", (pointer) => {
          const distance = Phaser.Math.Distance.Between(pointer.x, pointer.y, 195, 320);
          if (distance < 115 && pointer.y < 430) {
            this.pressMachine();
            tapFromCanvas(pointer);
          }
        });

        phaserBridge = this;
        this.sync(state);
      }

      update(time) {
        this.beltDots.forEach((dot, index) => {
          dot.x = 44 + ((time / 8 + index * 38) % 304);
          dot.alpha = 0.35 + Math.sin(time / 180 + index) * 0.18;
        });
      }

      sync(gameState) {
        if (!this.hudText) return;
        const cap = capacity();
        const stockRatio = Math.min(1, gameState.stock / cap);
        this.hudText.setText(`${Math.round(stockRatio * 100)}% stock  |  ${formatCompact(gameState.score)} rating`);
        this.drawMachinePulse(0.08 + stockRatio * 0.22);
      }

      drawMachinePulse(alpha) {
        if (!this.machinePulse) return;
        this.machinePulse.clear();
        this.machinePulse.fillStyle(0xffd35a, alpha);
        this.machinePulse.fillEllipse(196, 326, 190, 96);
        this.machinePulse.lineStyle(4, 0xfff2b8, alpha * 0.9);
        this.machinePulse.strokeEllipse(196, 326, 190, 96);
      }

      pressMachine() {
        if (!this.sceneArt) return;
        this.sceneArt.setScale(1.012, 0.992);
        this.tweens.add({
          targets: this.sceneArt,
          scaleX: 1,
          scaleY: 1,
          duration: 130,
          ease: "Back.Out",
        });
        this.spawnCoins(195, 320);
      }

      pressTapArt() {
        if (!this.tapArt) return;
        this.tweens.killTweensOf(this.tapArt);
        this.tapArt.setScale(0.94);
        this.tweens.add({
          targets: this.tapArt,
          scaleX: 1,
          scaleY: 1,
          duration: 130,
          ease: "Back.Out",
        });
        this.spawnCoins(195, 444);
      }

      spawnCoins(x, y) {
        for (let index = 0; index < 5; index += 1) {
          const coin = this.add.circle(x, y, Phaser.Math.Between(5, 8), 0xffd35a, 1);
          coin.setStrokeStyle(2, 0x8f5526);
          this.tweens.add({
            targets: coin,
            x: x + Phaser.Math.Between(-76, 76),
            y: y + Phaser.Math.Between(-98, -42),
            alpha: 0,
            scale: 0.35,
            duration: Phaser.Math.Between(520, 780),
            ease: "Cubic.Out",
            onComplete: () => coin.destroy(),
          });
        }
      }
    }

    try {
      const game = new Phaser.Game({
        type: Phaser.AUTO,
        parent: mount,
        width: 390,
        height: 560,
        backgroundColor: "#3d4969",
        transparent: false,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        render: {
          antialias: true,
          pixelArt: false,
        },
        scene: FactoryScene,
      });
      mount.__tapFactoryGame = game;
      document.documentElement.classList.add("has-phaser");
    } catch (_error) {
      document.documentElement.classList.add("no-phaser");
    }
  }

  function syncPhaserState() {
    if (phaserBridge && typeof phaserBridge.sync === "function") {
      phaserBridge.sync(state);
    }
  }

  function renderUpgrades() {
    els.upgradeHint.textContent = `${totalUpgradeLevels()} ${t("upgradesBought")}`;
    els.upgradeList.innerHTML = "";
    UPGRADES.forEach((def) => {
      const current = level(def.id);
      const maxed = current >= def.max;
      const cost = maxed ? 0 : upgradeCost(def);
      const canBuy = !maxed && state.money >= cost;
      const item = document.createElement("article");
      item.className = `shop-item${canBuy || maxed ? "" : " locked"}`;
      item.innerHTML = `
        <div class="item-copy">
          <strong>${t(def.name)} <span>${t("level")} ${current}</span></strong>
          <small>${t(def.desc)}</small>
        </div>
        <button class="buy-button" type="button" ${canBuy ? "" : "disabled"}>
          ${maxed ? t("max") : `${t("buy")} $${formatCompact(cost)}`}
        </button>
      `;
      item.querySelector("button").addEventListener("click", () => buyUpgrade(def.id));
      els.upgradeList.appendChild(item);
    });
  }

  function renderManagers() {
    els.managerHint.textContent = `${totalManagerLevels()} ${t("managersHired")}`;
    els.managerList.innerHTML = "";
    MANAGERS.forEach((def) => {
      const current = managerLevel(def.id);
      const maxed = current >= def.max;
      const cost = maxed ? 0 : managerCost(def);
      const canBuy = !maxed && state.money >= cost;
      const item = document.createElement("article");
      item.className = `shop-item${canBuy || maxed ? "" : " locked"}`;
      item.innerHTML = `
        <div class="item-copy">
          <strong>${t(def.name)} <span>${t("level")} ${current}</span></strong>
          <small>${t(def.desc)}</small>
        </div>
        <button class="buy-button" type="button" ${canBuy ? "" : "disabled"}>
          ${maxed ? t("max") : `${t("hire")} $${formatCompact(cost)}`}
        </button>
      `;
      item.querySelector("button").addEventListener("click", () => hireManager(def.id));
      els.managerList.appendChild(item);
    });
  }

  function renderContracts() {
    els.contractHint.textContent = `${state.completedContracts} ${t("contractsDone")}`;
    els.contractList.innerHTML = "";
    ensureContracts();
    state.contracts.forEach((contract) => {
      const percent = Math.min(100, (contract.progress / contract.target) * 100);
      const item = document.createElement("article");
      item.className = "contract-item";
      item.innerHTML = `
        <div class="item-copy">
          <strong>${contractTitle(contract)}</strong>
          <small>${t("reward")}: $${formatCompact(contract.rewardMoney)} + ${formatCompact(contract.rewardScore)} ${t("rating")}</small>
        </div>
        <div class="progress-track"><span style="width:${percent}%"></span></div>
        <div class="contract-meta">
          <span>${formatCompact(contract.progress)} / ${formatCompact(contract.target)}</span>
          <span>${percent >= 100 ? t("completed") : `${Math.floor(percent)}%`}</span>
        </div>
      `;
      els.contractList.appendChild(item);
    });

    const active = state.contracts[0];
    if (active) {
      els.activeContractTitle.textContent = contractTitle(active);
      els.activeContractProgress.style.width = `${Math.min(100, (active.progress / active.target) * 100)}%`;
    }
  }

  function renderRank() {
    updateBestScore();
    els.leaderboardHint.textContent = CONFIG.leaderboardGuide;
    els.bestScoreValue.textContent = formatCompact(state.bestScore);
    els.submittedScoreValue.textContent = formatCompact(state.submittedBest);
    els.platformValue.textContent = cg.env;
    const canBranch = state.totalEarned >= CONFIG.branchEarnedRequirement;
    els.branchButton.disabled = !canBranch;
    if (!els.leaderboardStatus.textContent) {
      showLeaderboardStatus(defaultLeaderboardStatus(), false);
    }
  }

  function renderTabs() {
    document.querySelectorAll(".tab-button").forEach((button) => {
      button.classList.toggle("active", button.dataset.tab === activeTab);
    });
    document.querySelectorAll(".tab-panel").forEach((panel) => {
      panel.classList.toggle("active", panel.id === `tab-${activeTab}`);
    });
  }

  function renderSdkStatus() {
    const ready = cg.canUse();
    els.sdkPill.classList.toggle("ready", ready);
    if (cg.env === "crazygames") {
      els.sdkPill.textContent = "CG";
    } else if (cg.env === "local") {
      els.sdkPill.textContent = "LOCAL";
    } else {
      els.sdkPill.textContent = "SDK";
    }
    els.platformValue.textContent = cg.env;
    if (activeTab === "rank") {
      showLeaderboardStatus(defaultLeaderboardStatus(), false);
    }
  }

  function defaultLeaderboardStatus() {
    if (cg.env === "crazygames") {
      return isValidBase64Key(CONFIG.crazyGamesEncryptionKey) ? t("sdkReady") : t("sdkMissingKey");
    }
    if (cg.env === "local") {
      return t("sdkLocal");
    }
    return t("sdkDisabled");
  }

  function setLanguage(lang, persist) {
    state.lang = I18N[lang] ? lang : "en";
    if (persist) saveState();
    renderAll();
  }

  function showLeaderboardStatus(message, saveMessage = true) {
    els.leaderboardStatus.textContent = message;
    if (saveMessage) showToast(message);
  }

  function spawnFx(clientX, clientY, text) {
    const rect = els.fxLayer.getBoundingClientRect();
    const fx = document.createElement("span");
    fx.className = "float-fx";
    fx.textContent = text;
    fx.style.setProperty("--x", `${clientX - rect.left}px`);
    fx.style.setProperty("--y", `${clientY - rect.top}px`);
    els.fxLayer.appendChild(fx);
    window.setTimeout(() => fx.remove(), 820);
  }

  function showToast(message) {
    window.clearTimeout(toastTimer);
    els.toast.textContent = message;
    els.toast.classList.add("show");
    toastTimer = window.setTimeout(() => els.toast.classList.remove("show"), 1800);
  }

  function tapPower() {
    const base = 1 + level("press") * 1.65;
    const managerBoost = 1 + managerLevel("foreman") * 0.15;
    const branchBoost = 1 + state.branches * 0.08;
    return Math.max(1, base * managerBoost * branchBoost);
  }

  function productionPerSecond() {
    const base = level("conveyor") * 0.72;
    const managerBoost = 1 + managerLevel("foreman") * 0.15;
    const branchBoost = 1 + state.branches * 0.08;
    return base * managerBoost * branchBoost;
  }

  function shippingPerSecond() {
    const base = 0.8 + level("delivery") * 0.74;
    const managerBoost = 1 + managerLevel("broker") * 0.12;
    return base * managerBoost;
  }

  function capacity() {
    return 60 + level("warehouse") * 44 + state.branches * 80;
  }

  function crateValue() {
    const base = 1 + level("packing") * 0.38;
    const broker = 1 + managerLevel("broker") * 0.1;
    const branch = 1 + state.branches * 0.06;
    return base * broker * branch;
  }

  function contractScoreMultiplier() {
    return 1 + level("planning") * 0.06;
  }

  function upgradeCost(def) {
    const discount = Math.max(0.72, 1 - managerLevel("engineer") * 0.035);
    return Math.round(def.baseCost * Math.pow(def.growth, level(def.id)) * discount);
  }

  function managerCost(def) {
    return Math.round(def.baseCost * Math.pow(def.growth, managerLevel(def.id)));
  }

  function level(id) {
    return state.upgrades[id] || 0;
  }

  function managerLevel(id) {
    return state.managers[id] || 0;
  }

  function totalUpgradeLevels() {
    return Object.values(state.upgrades).reduce((sum, value) => sum + value, 0);
  }

  function totalManagerLevels() {
    return Object.values(state.managers).reduce((sum, value) => sum + value, 0);
  }

  function tierLabel() {
    if (state.branches >= 2) return t("branchTier");
    if (state.score >= 15000) return t("exportTier");
    if (state.score >= 5000) return t("automatedTier");
    if (state.score >= 1200) return t("growingTier");
    return t("starterTier");
  }

  function contractTitle(contract) {
    const keys = {
      ship: "shipContract",
      tap: "tapContract",
      upgrade: "upgradeContract",
    };
    return t(keys[contract.type]).replace("{target}", formatCompact(contract.target));
  }

  function updateBestScore() {
    state.bestScore = Math.max(state.bestScore, Math.floor(state.score));
  }

  function applyOfflineProgress() {
    const now = Date.now();
    const seconds = Math.min(MAX_OFFLINE_SECONDS, Math.max(0, (now - state.lastSeenAt) / 1000));
    if (seconds < 10) return;
    const produced = productionPerSecond() * seconds;
    addStock(produced);
    const shipped = Math.min(state.stock, shippingPerSecond() * seconds);
    const earned = sellCrates(shipped);
    if (earned > 1) {
      showToast(`${t("offline")}: $${formatCompact(earned)}`);
    }
  }

  function saveState() {
    try {
      state.lastSeenAt = Date.now();
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    } catch (_error) {
      // Storage can be blocked in some iframe contexts.
    }
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return freshState();
      return Object.assign(freshState(), JSON.parse(raw));
    } catch (_error) {
      return freshState();
    }
  }

  function freshState() {
    return {
      version: VERSION,
      lang: "en",
      money: 0,
      stock: 0,
      totalEarned: 0,
      totalTaps: 0,
      score: 0,
      bestScore: 0,
      submittedBest: 0,
      lastSubmitAt: 0,
      lastSeenAt: Date.now(),
      branches: 0,
      completedContracts: 0,
      contractSeed: 0,
      upgrades: createLevelMap(UPGRADES),
      managers: createLevelMap(MANAGERS),
      contracts: [],
    };
  }

  function normalizeState() {
    state.upgrades = Object.assign(createLevelMap(UPGRADES), state.upgrades || {});
    state.managers = Object.assign(createLevelMap(MANAGERS), state.managers || {});
    state.contracts = Array.isArray(state.contracts) ? state.contracts : [];
    state.lang = I18N[state.lang] ? state.lang : "en";
    state.money = finiteNumber(state.money);
    state.stock = finiteNumber(state.stock);
    state.totalEarned = finiteNumber(state.totalEarned);
    state.score = finiteNumber(state.score);
    state.bestScore = finiteNumber(state.bestScore);
    state.submittedBest = finiteNumber(state.submittedBest);
    state.branches = finiteNumber(state.branches);
    state.completedContracts = finiteNumber(state.completedContracts);
    state.contractSeed = finiteNumber(state.contractSeed);
    state.lastSeenAt = state.lastSeenAt || Date.now();
  }

  function createLevelMap(defs) {
    return defs.reduce((map, def) => {
      map[def.id] = 0;
      return map;
    }, {});
  }

  function finiteNumber(value) {
    const number = Number(value);
    return Number.isFinite(number) ? number : 0;
  }

  function t(key) {
    return (I18N[state.lang] && I18N[state.lang][key]) || I18N.en[key] || key;
  }

  function formatCompact(value) {
    const number = Math.max(0, Number(value) || 0);
    if (number < 1000) {
      return number % 1 === 0 ? String(Math.floor(number)) : number.toFixed(1);
    }
    const units = ["K", "M", "B", "T"];
    let scaled = number;
    let unit = "";
    for (let index = 0; index < units.length && scaled >= 1000; index += 1) {
      scaled /= 1000;
      unit = units[index];
    }
    return `${scaled >= 10 ? scaled.toFixed(0) : scaled.toFixed(1)}${unit}`;
  }

  function wait(ms) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  function isValidBase64Key(key) {
    if (!key || typeof key !== "string") return false;
    try {
      return Uint8Array.from(atob(key), (char) => char.charCodeAt(0)).length === 32;
    } catch (_error) {
      return false;
    }
  }

  async function encryptScore(score, encryptionKey) {
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const algorithm = { name: "AES-GCM", iv };
    const keyBytes = Uint8Array.from(atob(encryptionKey), (char) => char.charCodeAt(0));
    const cryptoKey = await window.crypto.subtle.importKey("raw", keyBytes, algorithm, false, ["encrypt"]);
    const dataBuffer = new TextEncoder().encode(score.toString());
    const encryptedBuffer = await window.crypto.subtle.encrypt(algorithm, cryptoKey, dataBuffer);
    const combined = new Uint8Array(iv.length + encryptedBuffer.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encryptedBuffer), iv.length);
    return btoa(String.fromCharCode(...combined));
  }
})();

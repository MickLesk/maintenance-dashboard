// Panel stylesheet.
Object.assign(MaintenanceDashboardPanel.prototype, {
  _styles() {
    return `<style>
    :host{display:block;min-height:100vh;background:var(--primary-background-color);color:var(--primary-text-color);}
    .shell{min-height:100vh;box-sizing:border-box;padding:14px 32px 84px;max-width:1880px;margin:0 auto;}
    .hero{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:8px 4px 10px;border-bottom:1px solid color-mix(in srgb,var(--divider-color) 70%,transparent);margin-bottom:8px;}
    .hero-brand{display:flex;align-items:center;gap:16px;min-width:0}.compact-brand strong{font-size:.95rem;font-weight:900;letter-spacing:.01em}.hero-logo{width:58px;height:58px;border-radius:18px;object-fit:contain;filter:drop-shadow(0 8px 20px rgb(0 0 0 / 28%));flex:0 0 auto}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.icon-nav{min-width:42px;padding:0 12px}.icon-nav .sr-only{display:none}
    .eyebrow{margin:0 0 6px;color:var(--primary-color);font-weight:850;letter-spacing:.08em;text-transform:uppercase;font-size:.72rem;} h1{margin:0;font-size:clamp(1.5rem,3vw,2.6rem);letter-spacing:-.045em;} h2,h3,h4{margin:0;} p{margin:0;color:var(--secondary-text-color);} button,input,select,textarea{font:inherit;} button{cursor:pointer;transition:transform .1s ease,background .15s ease,border-color .15s ease;} button:active{transform:scale(.97);} button[disabled]{opacity:.45;pointer-events:none;}
    .hero-actions,.empty-actions,footer,.actions,.button-row{display:flex;gap:10px;flex-wrap:wrap;align-items:center;}.nav,.ghost,.primary,.icon{display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:999px;border:1px solid var(--divider-color);min-height:40px;padding:0 16px;background:color-mix(in srgb,var(--card-background-color) 92%,transparent);color:var(--primary-text-color);} .nav.active,.ghost:hover{background:color-mix(in srgb,var(--primary-color) 18%,transparent);border-color:color-mix(in srgb,var(--primary-color) 55%,var(--divider-color));}.primary{border:0;background:var(--primary-color);color:var(--text-primary-color);font-weight:850;}.big{min-height:48px;padding:0 22px;}.icon,.icon-only{width:40px;min-width:40px;padding:0;color:var(--secondary-text-color);}.danger{color:var(--error-color);}
    .dashboard-status-line{display:flex;align-items:center;gap:9px;flex-wrap:wrap;margin:6px 0 12px;color:var(--secondary-text-color);font-size:.88rem}.dashboard-status-line i{width:3px;height:3px;border-radius:50%;background:color-mix(in srgb,var(--secondary-text-color) 60%,transparent)}.dashboard-status-line b,.dashboard-status-line strong{color:var(--primary-text-color)}.dashboard-status-line .status-health{display:inline-flex;align-items:center;min-height:30px;padding:0 10px;border-radius:999px;box-shadow:0 0 0 1px color-mix(in srgb,var(--success-color,#4caf50) 35%,transparent),0 0 24px color-mix(in srgb,var(--success-color,#4caf50) 20%,transparent);color:var(--primary-text-color)}.dashboard-status-line .status-health.warning{box-shadow:0 0 0 1px color-mix(in srgb,var(--warning-color) 45%,transparent),0 0 24px color-mix(in srgb,var(--warning-color) 22%,transparent)}.dashboard-status-line .critical{color:var(--error-color)}.dashboard-status-line .warning{color:var(--warning-color)}.panel,.toolbar,.task-card,.empty,.template-card,.settings-row,.template-group{border:1px solid var(--divider-color);border-radius:24px;background:var(--card-background-color);box-shadow:var(--ha-card-box-shadow);}.toolbar{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:12px;padding:10px 12px;margin-bottom:12px;align-items:end;}.toolbar-copy{display:none}.toolbar-main{display:grid;grid-template-columns:minmax(240px,1fr) minmax(120px,150px) minmax(130px,160px) 42px auto;gap:10px;align-items:end;}.toolbar label{display:grid;gap:3px;color:var(--secondary-text-color);font-size:.68rem;font-weight:850;}.templates-main{grid-template-columns:minmax(260px,1fr) repeat(2,minmax(180px,max-content)) minmax(220px,max-content);}.expressive{background:radial-gradient(circle at 15% 0%,color-mix(in srgb,var(--primary-color) 16%,transparent),transparent 35%),var(--card-background-color);}.search,select,input,textarea{background:var(--input-fill-color,color-mix(in srgb,var(--primary-text-color) 7%,transparent));color:var(--primary-text-color);border:1px solid var(--divider-color);border-radius:14px;min-height:42px;padding:0 12px;outline:none;}.search{min-width:0;width:100%;}textarea{min-height:90px;padding:12px;resize:vertical;}
    .task-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,420px),1fr));gap:18px;align-items:stretch;}.task-card{--task-accent:var(--primary-color);position:relative;padding:18px;display:grid;grid-template-rows:auto auto auto auto 1fr auto;gap:14px;min-width:0;border-color:color-mix(in srgb,var(--task-accent) 34%,var(--divider-color));background:linear-gradient(135deg,color-mix(in srgb,var(--task-accent) 8%,transparent),transparent 42%),var(--card-background-color);overflow:visible;}.task-card header{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;}.title-row{display:flex;gap:12px;align-items:flex-start;min-width:0;}.title-row h3{overflow-wrap:anywhere;line-height:1.25;}.icon-chip{display:grid;place-items:center;width:42px;height:42px;border-radius:16px;background:color-mix(in srgb,var(--task-accent) 15%,transparent);color:var(--task-accent);flex:0 0 auto;}.status{border-radius:999px;padding:5px 9px;font-weight:850;font-size:.72rem;background:color-mix(in srgb,var(--primary-text-color) 8%,transparent);white-space:nowrap;}.status.warning{color:var(--warning-color);background:color-mix(in srgb,var(--warning-color) 15%,transparent);}.status.critical,.status.overdue{color:var(--error-color);background:color-mix(in srgb,var(--error-color) 15%,transparent);}.status.snoozed{color:var(--primary-color);background:color-mix(in srgb,var(--primary-color) 15%,transparent);}.description{line-height:1.45;min-height:2.7em;}.progress-line{display:flex;justify-content:space-between;color:var(--secondary-text-color);}.progress{height:12px;background:color-mix(in srgb,var(--disabled-text-color) 16%,transparent);border-radius:999px;overflow:hidden;}.progress div{height:100%;background:var(--task-accent);border-radius:999px;}.task-card.overdue,.task-card.critical{border-color:color-mix(in srgb,var(--error-color) 62%,var(--divider-color));}.task-card.warning{border-color:color-mix(in srgb,var(--warning-color) 62%,var(--divider-color));}.task-card.unavailable{border-color:color-mix(in srgb,var(--disabled-text-color) 55%,var(--divider-color));}.meta-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;}.meta-grid div{background:color-mix(in srgb,var(--primary-text-color) 7%,transparent);border-radius:16px;padding:10px;min-width:0;}.meta-grid span{display:block;color:color-mix(in srgb,var(--primary-text-color) 78%,var(--secondary-text-color));font-size:.68rem;font-weight:900;text-transform:uppercase;}.meta-grid strong{display:block;margin-top:4px;color:var(--primary-text-color);overflow:hidden;text-overflow:ellipsis;}.meta-grid em{font-style:normal;color:var(--secondary-text-color);font-size:.8rem;margin-left:6px;}.snooze-note{display:flex;align-items:center;gap:7px;padding:9px 11px;border-radius:14px;background:color-mix(in srgb,var(--primary-color) 12%,transparent);color:var(--primary-color);font-weight:850;}.snooze-wrap{position:relative;}.snooze-menu{position:absolute;right:0;bottom:48px;z-index:20;display:grid;gap:6px;min-width:170px;padding:10px;border:1px solid var(--divider-color);border-radius:18px;background:var(--card-background-color);box-shadow:0 16px 40px rgb(0 0 0 / 35%);}.snooze-menu strong{font-size:.8rem;color:var(--secondary-text-color);}.snooze-menu button{border:0;border-radius:12px;min-height:34px;background:color-mix(in srgb,var(--primary-text-color) 6%,transparent);color:var(--primary-text-color);}@keyframes task-focus-pulse{0%{transform:scale(1);box-shadow:0 0 0 0 color-mix(in srgb,var(--task-accent) 50%,transparent)}20%{transform:scale(1.015);box-shadow:0 0 0 7px color-mix(in srgb,var(--task-accent) 26%,transparent)}45%{transform:scale(.997);box-shadow:0 0 0 13px color-mix(in srgb,var(--task-accent) 12%,transparent)}70%{transform:scale(1.008);box-shadow:0 0 0 5px color-mix(in srgb,var(--task-accent) 22%,transparent)}100%{transform:scale(1);box-shadow:var(--ha-card-box-shadow)}}.task-card.focus-pulse{animation:task-focus-pulse 1.45s ease both;z-index:5;}
    .empty{min-height:330px;display:grid;place-items:center;text-align:center;padding:34px;gap:14px;}.empty-orb{display:grid;place-items:center;width:90px;height:90px;border-radius:32px;color:var(--primary-color);background:radial-gradient(circle,color-mix(in srgb,var(--primary-color) 28%,transparent),color-mix(in srgb,var(--primary-color) 8%,transparent));}.empty-orb ha-icon{--mdc-icon-size:46px;}.template-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));gap:16px;}.template-group{padding:18px;margin-bottom:18px;display:grid;gap:16px}.template-group-header{display:flex;align-items:end;justify-content:space-between;gap:12px;padding-bottom:6px;border-bottom:1px solid color-mix(in srgb,var(--primary-text-color) 10%,transparent)}.template-group-header span{display:inline-grid;place-items:center;min-width:36px;height:36px;padding:0 10px;border-radius:999px;background:color-mix(in srgb,var(--primary-color) 12%,transparent);color:var(--primary-color);font-weight:850}.template-card{padding:16px;display:grid;gap:12px;}.template-card.selected{border-color:color-mix(in srgb,var(--primary-color) 60%,var(--divider-color));background:linear-gradient(135deg,color-mix(in srgb,var(--primary-color) 10%,transparent),transparent 50%),var(--card-background-color);}.template-card header{display:flex;align-items:center;gap:10px;}.template-card h3{line-height:1.25;}.template-check input{display:none;}.template-check span{display:grid;width:22px;height:22px;border-radius:7px;border:1px solid var(--divider-color);background:color-mix(in srgb,var(--primary-text-color) 4%,transparent);}.template-check input:checked + span{background:var(--primary-color);border-color:var(--primary-color);}.template-check input:checked + span:after{content:'✓';color:var(--text-primary-color);font-weight:900;text-align:center;line-height:21px;}.panel{padding:18px;margin-bottom:16px;}.history-dialog .panel{margin-bottom:0;border:0;background:transparent;box-shadow:none;padding:0;}.history-list,.settings-list{display:grid;gap:10px;}.history-row,.settings-row{display:flex;align-items:center;gap:12px;padding:13px;}.history-row div,.settings-row div{flex:1;}.history-row small,.settings-row small{display:block;color:var(--secondary-text-color);margin-top:3px;}.settings-head{display:flex;align-items:center;justify-content:space-between;gap:14px;}.drag{color:var(--secondary-text-color);cursor:grab;}
    .dialog-backdrop{position:fixed;inset:0;z-index:2147483000;display:grid;place-items:center;padding:24px;background:rgb(3 5 14 / 94%);}.dialog{width:min(1060px,100%);max-height:90vh;overflow:auto;border-radius:28px;background:var(--card-background-color);border:1px solid var(--divider-color);box-shadow:0 28px 90px rgb(0 0 0 / 48%);}.dialog.small{width:min(760px,100%);}.dialog>header,.dialog>footer{padding:18px 22px;border-bottom:1px solid var(--divider-color);display:flex;justify-content:space-between;align-items:center;}.dialog>footer{border-top:1px solid var(--divider-color);border-bottom:0;justify-content:flex-end;}.dialog-body{display:grid;gap:16px;padding:18px;}.dialog-section{display:grid;gap:14px;padding:16px;border:1px solid var(--divider-color);border-radius:20px;background:color-mix(in srgb,var(--primary-text-color) 2%,transparent);}.dialog-section .section-hint{margin:0;color:var(--secondary-text-color);font-size:.82rem;line-height:1.35}.form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px;}.appearance-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;align-items:start}.appearance-icon-field{grid-column:1 / -1}.field,.entity-field,.description-field{display:grid;gap:7px;color:var(--secondary-text-color);font-size:.78rem;font-weight:850;}.field input[type=color]{width:56px;height:44px;padding:4px;border-radius:13px}.color-input-row{display:flex;align-items:center;gap:8px}.color-field input[type=color]{flex:0 0 auto}.color-actions{display:flex;flex-wrap:wrap;gap:10px}.ghost.small{min-height:34px;padding:0 10px}.icon-picker-field{min-width:0}.icon-picker-field ha-icon-picker{width:100%;max-width:100%;display:block}.check{display:flex;gap:10px;align-items:center;font-weight:850;}.template-strip,.icon-grid{display:flex;flex-wrap:wrap;gap:8px;}.template-pill,.icon-choice{border:1px solid var(--divider-color);border-radius:999px;min-height:36px;padding:0 12px;background:transparent;color:var(--primary-text-color);display:inline-flex;gap:7px;align-items:center;}.icon-choice{width:42px;padding:0;justify-content:center;}.inline-priority{display:grid;gap:12px;margin-top:4px;padding:14px;border-radius:18px;background:color-mix(in srgb,var(--primary-text-color) 3%,transparent);}.priority-head{display:flex;align-items:start;justify-content:space-between;gap:12px}.priority-head strong{font-size:1rem}.priority-slider{width:100%;accent-color:var(--primary-color);min-height:28px;padding:0;border:0;background:transparent}.priority-scale{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px}.priority-scale span{font-size:.74rem;color:var(--secondary-text-color);text-align:center;padding-top:4px}.priority-scale span.active{color:var(--primary-text-color);font-weight:850}.error{color:var(--error-color);font-weight:850;padding:12px;border-radius:14px;background:color-mix(in srgb,var(--error-color) 12%,transparent);}.backup-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px;border:1px solid var(--divider-color);border-radius:14px;}.toast{position:fixed;right:22px;bottom:22px;z-index:2147483001;display:flex;align-items:center;gap:10px;max-width:min(420px,calc(100vw - 32px));padding:13px 16px;border-radius:18px;background:color-mix(in srgb,var(--card-background-color) 96%,black);border:1px solid color-mix(in srgb,var(--primary-color) 38%,var(--divider-color));box-shadow:0 18px 55px rgb(0 0 0 / 42%);font-weight:850}.toast ha-icon{color:var(--primary-color)}@media(max-width:820px){.appearance-grid{grid-template-columns:1fr}.dialog{border-radius:20px}.dialog-backdrop{padding:10px}}
    @media (max-width:980px){.toolbar,.templates-toolbar{grid-template-columns:1fr}.toolbar-main,.templates-main{grid-template-columns:1fr 1fr}.toolbar-main>.primary.big,.templates-main>.primary.big{grid-column:1/-1}.templates-main .search{grid-column:1/-1}}
    @media (max-width:760px){.shell{padding:12px}.hero,.settings-head{flex-direction:column;align-items:stretch}.hero-brand{align-items:flex-start}.hero-logo{width:46px;height:46px}.hero-actions,.empty-actions,footer,.actions{flex-direction:column;align-items:stretch}.task-grid,.template-grid{grid-template-columns:1fr}.dialog-backdrop{padding:8px}.snooze-menu{left:0;right:auto}}
    .category-tabs{display:flex;gap:8px;overflow-x:auto;padding:4px 0 16px;scrollbar-width:thin}.tab{border:1px solid var(--divider-color);border-radius:999px;background:transparent;color:var(--primary-text-color);padding:10px 14px;white-space:nowrap;font-weight:800}.tab.active{background:color-mix(in srgb,var(--primary-color) 24%,transparent);border-color:color-mix(in srgb,var(--primary-color) 70%,var(--divider-color));}.template-grid.compact{grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr));}.template-card.compact p{display:none}.template-card.compact footer{display:flex;gap:8px;align-items:center}.settings-actions{display:flex;gap:10px;flex-wrap:wrap}.toggle-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px}.toggle-grid .check{padding:10px;border:1px solid var(--divider-color);border-radius:14px;background:color-mix(in srgb,var(--primary-text-color) 3%,transparent)}.diagnostic-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px}.diagnostic-grid div{padding:10px;border-radius:14px;background:color-mix(in srgb,var(--primary-text-color) 4%,transparent)}.diagnostic-grid span{display:block;color:var(--secondary-text-color);font-size:.72rem;text-transform:uppercase;font-weight:850}.template-preview>ha-icon{--mdc-icon-size:44px;color:var(--primary-color)}
    @media (max-width: 620px){.shell{padding:10px}.hero{gap:12px;border-bottom:0;margin-bottom:8px;padding-bottom:8px}.hero-brand{display:grid;grid-template-columns:42px 1fr;gap:10px}.hero-brand h1{font-size:1.35rem}.hero-brand p:not(.eyebrow){font-size:.8rem;line-height:1.25}.hero-actions{display:grid;grid-template-columns:1fr 1fr 44px 44px;gap:8px}.hero-actions .nav{min-height:42px;padding:0 10px}.hero-actions .icon-nav{width:auto}.toolbar{padding:12px}.toolbar-main,.templates-main{grid-template-columns:1fr;gap:10px}.toolbar .primary.big,.templates-main .primary.big,.templates-main .search{grid-column:auto}.search{width:100%;min-width:0}.task-card{padding:14px;border-radius:22px}.task-card header{align-items:flex-start}.description{min-height:auto;font-size:.9rem}.meta-grid{grid-template-columns:1fr 1fr;gap:8px}.meta-grid div{padding:9px}.actions{display:grid!important;grid-template-columns:44px 44px 1fr;gap:8px}.actions .ghost:not(.icon-only){grid-column:1/-1}.actions .primary{min-width:0}.template-grid.compact{grid-template-columns:1fr}.template-card.compact{padding:14px}.template-card.compact footer{display:grid;grid-template-columns:1fr 1fr}.dialog-backdrop{align-items:end;place-items:end stretch;padding:0}.dialog{max-height:94vh;width:100%;border-radius:24px 24px 0 0}.dialog.small{width:100%}.dialog>header,.dialog>footer{padding:14px 16px}.dialog-body{padding:14px}.form-grid,.appearance-grid{grid-template-columns:1fr}.toast{left:10px;right:10px;bottom:10px}.category-tabs{margin:0 -4px;padding:2px 4px 12px}.settings-row{display:grid;grid-template-columns:28px 28px 1fr 36px 36px;gap:8px}.settings-row .danger{grid-column:5}.settings-actions{display:grid;grid-template-columns:1fr}.history-row{align-items:flex-start}.priority-head{display:grid;gap:6px}.priority-scale{grid-template-columns:1fr}.priority-scale span{text-align:left}.template-group{padding:14px}}

    .schedule-callout{display:flex;gap:12px;align-items:flex-start;padding:14px;border-radius:18px;background:color-mix(in srgb,var(--primary-color) 10%,transparent);border:1px solid color-mix(in srgb,var(--primary-color) 24%,var(--divider-color));}.schedule-callout ha-icon{color:var(--primary-color);flex:0 0 auto}.task-card.completed{opacity:.88;border-style:dashed}.task-card.completed .progress div{background:var(--success-color,#4caf50)}.dashboard-main{grid-template-columns:minmax(220px,auto) minmax(260px,1fr) minmax(130px,160px) minmax(130px,160px) auto}.completed-toggle{align-self:end;min-height:42px}
    .template-filter-bar{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:18px}.template-secondary-filters{display:flex;align-items:end;gap:10px;flex-wrap:wrap}.template-secondary-filters label:not(.check){display:grid;gap:5px;color:var(--secondary-text-color);font-size:.75rem;font-weight:850}.compact-check{min-height:42px;padding:0 12px;border:1px solid var(--divider-color);border-radius:14px;background:var(--card-background-color)}.starter-packs{display:grid;gap:14px;margin-bottom:18px}.section-title{display:flex;justify-content:space-between;align-items:end}.pack-strip{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px}.pack-mini,.pack-card{display:grid;grid-template-columns:44px 1fr auto;gap:12px;align-items:center;padding:14px;border:1px solid var(--divider-color);border-radius:20px;background:var(--card-background-color);color:var(--primary-text-color);text-align:left}.pack-mini>ha-icon,.pack-card>ha-icon{display:grid;place-items:center;padding:10px;border-radius:14px;background:color-mix(in srgb,var(--primary-color) 14%,transparent);color:var(--primary-color)}.pack-mini p,.pack-card p{font-size:.82rem;line-height:1.35;margin-top:4px}.pack-mini small,.pack-card small{display:block;color:var(--secondary-text-color);margin-top:6px}.pack-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px}.pack-card{width:100%;cursor:pointer}.pack-card.selected{border-color:var(--primary-color);background:linear-gradient(135deg,color-mix(in srgb,var(--primary-color) 14%,transparent),transparent),var(--card-background-color)}.pack-check{color:var(--primary-color)}.onboarding-dialog{width:min(980px,100%)}.onboarding-hero{display:grid;grid-template-columns:auto 1fr;gap:18px;align-items:center;padding:18px;border-radius:22px;background:radial-gradient(circle at 0 0,color-mix(in srgb,var(--primary-color) 18%,transparent),transparent 50%),color-mix(in srgb,var(--primary-text-color) 2%,transparent)}
    .template-title{min-width:0;display:grid;gap:6px}.template-badges{display:flex;gap:6px;flex-wrap:wrap}.template-badge{padding:3px 7px;border-radius:999px;background:color-mix(in srgb,var(--primary-color) 13%,transparent);color:var(--primary-color);font-size:.66rem;font-weight:900;text-transform:uppercase}.template-badge.popular{background:color-mix(in srgb,var(--warning-color) 16%,transparent);color:var(--warning-color)}.template-badge.season{background:color-mix(in srgb,var(--success-color,#4caf50) 14%,transparent);color:var(--success-color,#4caf50)}.tag-list{display:flex;gap:6px;flex-wrap:wrap}.tag-list>span{padding:4px 8px;border-radius:999px;background:color-mix(in srgb,var(--primary-text-color) 5%,transparent);color:var(--secondary-text-color);font-size:.7rem}.template-preview-heading,.completion-heading{display:flex;gap:14px;align-items:flex-start}.template-preview-heading>ha-icon,.completion-heading>ha-icon{--mdc-icon-size:38px;color:var(--primary-color);padding:10px;border-radius:16px;background:color-mix(in srgb,var(--primary-color) 12%,transparent)}.preview-tags{display:grid;gap:8px}
    .history-panel{display:grid;gap:14px}.history-toolbar{display:grid;grid-template-columns:minmax(220px,1fr) repeat(2,minmax(150px,220px));gap:10px;align-items:end}.history-toolbar label{display:grid;gap:5px;color:var(--secondary-text-color);font-size:.75rem;font-weight:850}.completion-details{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}.completion-details span{display:inline-flex;align-items:center;gap:5px;padding:5px 8px;border-radius:10px;background:color-mix(in srgb,var(--primary-text-color) 5%,transparent);font-size:.75rem;color:var(--secondary-text-color)}.completion-details ha-icon{--mdc-icon-size:16px}.history-dialog{width:min(1100px,100%)}
    @media(max-width:980px){.dashboard-main{grid-template-columns:1fr 1fr}.completed-toggle{grid-column:1/-1}.template-filter-bar{align-items:stretch;flex-direction:column}.template-secondary-filters{display:grid;grid-template-columns:1fr 1fr}.history-toolbar{grid-template-columns:1fr 1fr}.history-toolbar .search{grid-column:1/-1}}
    @media(max-width:620px){.pack-strip,.pack-grid{grid-template-columns:1fr}.pack-mini,.pack-card{grid-template-columns:38px 1fr}.pack-mini button,.pack-check{grid-column:1/-1;width:100%}.onboarding-hero{grid-template-columns:1fr;text-align:center}.onboarding-hero .empty-orb{margin:auto}.template-secondary-filters,.history-toolbar{grid-template-columns:1fr}.history-toolbar .search{grid-column:auto}.completion-details{display:grid}.completed-toggle{grid-column:auto}}

    .history-content{min-width:0}.history-title{display:flex;align-items:center;gap:10px;flex-wrap:wrap}.history-event-type{display:inline-flex;padding:4px 8px;border-radius:999px;background:color-mix(in srgb,var(--primary-color) 12%,transparent);color:var(--primary-color);font-size:.7rem;font-weight:850}.history-changes{margin-top:10px;border:1px solid var(--divider-color);border-radius:14px;overflow:hidden}.history-changes summary{display:flex;align-items:center;gap:8px;padding:10px 12px;cursor:pointer;font-weight:850;background:color-mix(in srgb,var(--primary-text-color) 3%,transparent)}.history-changes summary::-webkit-details-marker{display:none}.history-change-head,.history-change-row{display:grid;grid-template-columns:minmax(110px,.8fr) minmax(120px,1fr) 24px minmax(120px,1fr);gap:8px;align-items:center;padding:8px 12px}.history-change-head{color:var(--secondary-text-color);font-size:.7rem;text-transform:uppercase;border-top:1px solid var(--divider-color)}.history-change-row{border-top:1px solid color-mix(in srgb,var(--divider-color) 70%,transparent);font-size:.82rem}.history-change-row>span{overflow-wrap:anywhere}.history-change-row>ha-icon{--mdc-icon-size:16px;color:var(--secondary-text-color)}
    @media(max-width:620px){.history-change-head{display:none}.history-change-row{grid-template-columns:1fr;gap:4px}.history-change-row>ha-icon{transform:rotate(90deg);justify-self:center}}

    .advanced-section{padding:0;overflow:hidden}.advanced-section>summary{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px;cursor:pointer;font-weight:850;list-style:none}.advanced-section>summary::-webkit-details-marker{display:none}.advanced-section>summary>span{display:flex;align-items:center;gap:9px}.advanced-section>summary small{color:var(--secondary-text-color);font-weight:700}.advanced-body{display:grid;gap:14px;padding:0 16px 16px;border-top:1px solid var(--divider-color)}.advanced-body>.check{margin-top:14px}
    .section-title-actions{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}.notification-overview{display:flex;align-items:center;justify-content:space-between;gap:18px;background:radial-gradient(circle at 0 0,color-mix(in srgb,var(--primary-color) 16%,transparent),transparent 48%),color-mix(in srgb,var(--primary-text-color) 2%,transparent)}.switch-card{display:flex;align-items:center;gap:12px;padding:12px 14px;border:1px solid var(--divider-color);border-radius:18px;min-width:200px;background:var(--card-background-color)}.switch-card span{display:grid;gap:2px}.switch-card small{color:var(--secondary-text-color)}.notification-preview-card{display:grid;gap:8px;padding:14px;border:1px solid var(--divider-color);border-radius:18px;background:color-mix(in srgb,var(--primary-text-color) 3%,transparent)}.notification-preview-card.escalated{border-color:color-mix(in srgb,var(--error-color) 65%,var(--divider-color));background:color-mix(in srgb,var(--error-color) 10%,var(--card-background-color))}.notification-preview-card pre{white-space:pre-wrap;overflow-wrap:anywhere;margin:0;font:inherit;color:var(--secondary-text-color)}.preview-actions{display:flex;gap:8px;flex-wrap:wrap}.preview-actions span{padding:6px 9px;border-radius:999px;background:color-mix(in srgb,var(--primary-color) 12%,transparent);color:var(--primary-color);font-size:.75rem;font-weight:800}.notification-history{display:grid;gap:8px}.notification-history article{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:11px 12px;border:1px solid var(--divider-color);border-radius:14px;background:color-mix(in srgb,var(--primary-text-color) 3%,transparent)}.notification-history small{display:block;color:var(--secondary-text-color);margin-top:3px}
    @media(max-width:620px){.section-title-actions{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}.notification-overview{display:grid}.switch-card{min-width:0}.advanced-section>summary{align-items:flex-start}.advanced-section>summary small{display:none}.notification-history article{align-items:flex-start}}

    /* v1.6 dashboard layouts, recovery and settings */
    .layout-switch{display:flex;gap:6px;flex-wrap:wrap;grid-column:1/-1;justify-content:flex-end}.layout-switch .icon{width:auto;min-width:42px;padding:0 12px}.layout-switch .icon span{display:none}.layout-switch .icon.active{background:color-mix(in srgb,var(--primary-color) 18%,transparent);border-color:var(--primary-color);color:var(--primary-color)}
    .compact-dashboard-toolbar{position:sticky;top:0;z-index:10;background:color-mix(in srgb,var(--card-background-color) 86%,transparent);backdrop-filter:blur(18px);border-radius:18px}.compact-dashboard-toolbar .dashboard-main{grid-template-columns:minmax(260px,1fr) minmax(120px,150px) minmax(130px,160px) 42px auto}.compact-dashboard-toolbar .layout-switch{grid-column:auto;align-self:end;flex-wrap:nowrap}.compact-dashboard-toolbar .completed-toggle{min-height:42px}.dashboard-fab{position:fixed;right:28px;bottom:28px;z-index:2147482900;display:grid;place-items:center;width:58px;height:58px;border:0;border-radius:22px;background:color-mix(in srgb,var(--primary-color) 92%,transparent);color:var(--text-primary-color);box-shadow:0 14px 34px color-mix(in srgb,var(--primary-color) 32%,transparent),0 7px 18px rgb(0 0 0 / 34%)}.dashboard-fab ha-icon{--mdc-icon-size:30px}.dashboard-fab span{display:none}.dashboard-fab:hover{box-shadow:0 0 0 8px color-mix(in srgb,var(--primary-color) 16%,transparent),0 20px 44px color-mix(in srgb,var(--primary-color) 38%,transparent);transform:translateY(-1px)}
    .density-compact .task-card,.density-compact .panel{border-radius:14px}.density-compact .task-card{gap:10px;padding:14px}.density-compact .meta-grid{gap:8px}.density-compact .description{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.quick-filter-strip{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 12px}.quick-filter-strip button{display:inline-flex;align-items:center;gap:7px;min-height:34px;padding:0 10px;border:1px solid var(--divider-color);border-radius:999px;background:var(--card-background-color);color:var(--primary-text-color);font-weight:800}.quick-filter-strip button.active{border-color:var(--primary-color);background:color-mix(in srgb,var(--primary-color) 14%,transparent);color:var(--primary-color)}.quick-filter-strip strong{padding:2px 7px;border-radius:999px;background:color-mix(in srgb,var(--primary-text-color) 8%,transparent);font-size:.72rem}.tag-strip{display:flex;gap:6px;flex-wrap:wrap}.tag-strip button{border:1px solid var(--divider-color);border-radius:999px;background:transparent;color:var(--secondary-text-color);min-height:28px;padding:0 9px;font-size:.75rem;font-weight:800}.tag-strip button:hover{border-color:var(--primary-color);color:var(--primary-color)}
    .advanced-filter-panel{padding:18px;margin-bottom:18px;display:grid;gap:16px}.filter-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px}.filter-grid label,.saved-filter-bar label,.bulk-toolbar label{display:grid;gap:5px;color:var(--secondary-text-color);font-size:.75rem;font-weight:850}.saved-filter-bar{display:flex;gap:10px;align-items:end;flex-wrap:wrap}.saved-filter-bar .grow{min-width:220px;flex:1}.saved-filter-list{display:flex;gap:7px;flex-wrap:wrap;width:100%}.saved-filter-chip{display:inline-flex;border:1px solid var(--divider-color);border-radius:999px;overflow:hidden;background:color-mix(in srgb,var(--primary-text-color) 4%,transparent)}.saved-filter-chip button{border:0;background:transparent;color:var(--primary-text-color);padding:7px 10px}.saved-filter-chip .icon{width:30px;min-width:30px;padding:0}
    .bulk-toolbar{display:flex;align-items:end;gap:12px;flex-wrap:wrap;padding:14px 18px;margin-bottom:18px;border-color:color-mix(in srgb,var(--primary-color) 55%,var(--divider-color));position:sticky;top:8px;z-index:12}.bulk-toolbar>strong{align-self:center;margin-right:auto}.bulk-toolbar input,.bulk-toolbar select{min-width:130px}.task-select{display:grid;place-items:center;flex:0 0 auto}.task-select input{width:18px;height:18px;min-height:0;padding:0;accent-color:var(--primary-color)}.task-card>header>.task-select{position:absolute;left:10px;top:10px;z-index:2}.task-card>header{padding-left:22px}
    .compact-task-list{display:grid;gap:8px}.compact-task-row{display:grid;grid-template-columns:auto auto minmax(180px,1fr) minmax(110px,auto) auto auto auto;gap:12px;align-items:center;padding:12px 14px;border:1px solid var(--divider-color);border-radius:18px;background:var(--card-background-color)}.compact-task-row small{display:block;color:var(--secondary-text-color);margin-top:3px}.compact-task-row .icon-chip{width:36px;height:36px;border-radius:12px}.grow{min-width:0;flex:1}
    .timeline-view{position:relative;display:grid;gap:0;padding-left:28px}.timeline-view:before{content:"";position:absolute;left:10px;top:10px;bottom:10px;width:2px;background:var(--divider-color)}.timeline-entry{position:relative;display:grid;grid-template-columns:140px 1fr;gap:16px;padding:0 0 18px}.timeline-marker{position:absolute;left:-24px;top:18px;width:12px;height:12px;border-radius:50%;background:var(--primary-color);box-shadow:0 0 0 5px var(--primary-background-color)}.timeline-entry.warning .timeline-marker{background:var(--warning-color)}.timeline-entry.critical .timeline-marker,.timeline-entry.overdue .timeline-marker{background:var(--error-color)}.timeline-date{padding-top:14px;color:var(--secondary-text-color);font-weight:800}.timeline-card{padding:14px 16px;border:1px solid var(--divider-color);border-radius:18px;background:var(--card-background-color)}.timeline-card header{display:flex;justify-content:space-between;gap:12px}.timeline-card p{margin:8px 0 12px}
    .settings-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-bottom:18px}.settings-section{padding:18px;display:grid;gap:16px}.settings-section>header{display:flex;gap:12px;align-items:flex-start}.settings-section>header>ha-icon{padding:10px;border-radius:14px;background:color-mix(in srgb,var(--primary-color) 14%,transparent);color:var(--primary-color)}.settings-section>header p{margin-top:4px}.check-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:9px}.settings-save{display:flex;justify-content:flex-end;padding:14px 18px;margin-bottom:18px}
    .data-dialog,.diagnostics-dialog{width:min(1120px,100%)}.integrity-summary{border-color:color-mix(in srgb,var(--success-color,#4caf50) 45%,var(--divider-color))}.integrity-summary.has-errors{border-color:color-mix(in srgb,var(--error-color) 55%,var(--divider-color));background:color-mix(in srgb,var(--error-color) 5%,transparent)}.issue-list{display:grid;gap:7px;margin-top:12px}.issue{display:flex;gap:10px;align-items:center;padding:10px;border:1px solid var(--divider-color);border-radius:14px}.issue>div{flex:1}.issue small{display:block;color:var(--secondary-text-color)}.issue.error>ha-icon{color:var(--error-color)}.issue.warning>ha-icon{color:var(--warning-color)}
    .backup-list,.quarantine-list{display:grid;gap:8px}.backup-row,.quarantine-list article{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:11px 12px;border:1px solid var(--divider-color);border-radius:15px;background:color-mix(in srgb,var(--primary-text-color) 3%,transparent)}.backup-row.pinned{border-color:color-mix(in srgb,var(--primary-color) 55%,var(--divider-color))}.backup-main{display:flex;align-items:center;gap:10px;min-width:0}.backup-main>ha-icon{color:var(--primary-color)}.backup-main small,.quarantine-list small{display:block;color:var(--secondary-text-color);margin-top:3px}.backup-diff-section details{border:1px solid var(--divider-color);border-radius:15px;padding:10px 12px}.backup-diff-section summary{cursor:pointer;font-weight:850}.diff-summary{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.diff-summary>div{display:grid;place-items:center;padding:12px;border-radius:15px;background:color-mix(in srgb,var(--primary-text-color) 4%,transparent)}.diff-summary strong{font-size:1.3rem}.diff-summary span{color:var(--secondary-text-color);font-size:.75rem}.change-list{display:grid;gap:10px;margin-top:10px}.change-list article{padding:10px;border-top:1px solid var(--divider-color)}.field-diff{display:grid;grid-template-columns:110px minmax(0,1fr) auto minmax(0,1fr);gap:8px;align-items:center;margin-top:6px}.field-diff code{padding:5px 7px;border-radius:8px;background:color-mix(in srgb,var(--primary-text-color) 6%,transparent);overflow-wrap:anywhere}.restore-options{display:flex;gap:10px;flex-wrap:wrap}.import-preview{display:flex;gap:12px;flex-wrap:wrap;padding:11px 13px;border-radius:14px;background:color-mix(in srgb,var(--success-color,#4caf50) 10%,transparent)}.import-preview.error{background:color-mix(in srgb,var(--error-color) 10%,transparent)}.diagnostics-dialog pre{white-space:pre-wrap;overflow:auto;max-height:260px;padding:12px;border-radius:14px;background:color-mix(in srgb,var(--primary-text-color) 5%,transparent)}
    .small{min-height:34px;padding:0 11px;font-size:.78rem}
    @media(max-width:980px){.settings-grid{grid-template-columns:1fr}.compact-task-row{grid-template-columns:auto auto minmax(140px,1fr) auto auto}.compact-task-row>span:nth-of-type(2){display:none}.timeline-entry{grid-template-columns:110px 1fr}.diff-summary{grid-template-columns:repeat(2,1fr)}.field-diff{grid-template-columns:1fr}.field-diff>ha-icon{transform:rotate(90deg);justify-self:center}}
    @media(max-width:620px){.layout-switch{justify-content:stretch}.layout-switch .icon{flex:1}.compact-brand{display:block}.compact-brand strong{display:block}.compact-dashboard-toolbar{position:static;grid-template-columns:1fr}.compact-dashboard-toolbar .dashboard-main{grid-template-columns:1fr}.compact-dashboard-toolbar .layout-switch{justify-content:stretch}.compact-task-row{grid-template-columns:auto auto 1fr auto}.compact-task-row>.status,.compact-task-row>span:not(.icon-chip){display:none}.bulk-toolbar{position:static;align-items:stretch}.bulk-toolbar>*{width:100%}.timeline-entry{grid-template-columns:1fr}.timeline-date{padding-top:0}.backup-row,.quarantine-list article{align-items:flex-start;flex-direction:column}.backup-row .button-row,.quarantine-list .button-row{width:100%}.diff-summary{grid-template-columns:1fr 1fr}}
    .ordering-help{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 18px;margin-bottom:16px}.settings-row.dragging{opacity:.55;transform:scale(.99);border-color:var(--primary-color)}.settings-row.drop-target{border-color:var(--primary-color);box-shadow:inset 0 3px 0 var(--primary-color);background:color-mix(in srgb,var(--primary-color) 9%,var(--card-background-color))}
    .settings-row .drag:focus-visible{outline:2px solid var(--primary-color);outline-offset:2px}
    .audit-list{display:grid;gap:8px}.audit-list article{display:flex;gap:10px;padding:11px 12px;border:1px solid var(--divider-color);border-radius:15px;background:color-mix(in srgb,var(--primary-text-color) 3%,transparent)}.audit-icon{display:grid;place-items:center;width:36px;height:36px;border-radius:12px;background:color-mix(in srgb,var(--primary-color) 12%,transparent);color:var(--primary-color);flex:0 0 auto}.audit-content{min-width:0;flex:1}.audit-content small{display:block;color:var(--secondary-text-color);margin-top:3px}.audit-content details{margin-top:8px}.audit-content pre{white-space:pre-wrap;overflow:auto;max-height:220px;padding:10px;border-radius:12px;background:color-mix(in srgb,var(--primary-text-color) 5%,transparent)}
    .bulk-preview-dialog{width:min(920px,100%)}.bulk-preview-dialog .change-list{max-height:55vh;overflow:auto}.bulk-preview-dialog .diff-summary{grid-template-columns:repeat(3,1fr)}
    @media(max-width:620px){.bulk-preview-dialog .diff-summary{grid-template-columns:1fr}.audit-list article{align-items:flex-start}}
    /* v1.9.0 Material 3 workflow and checklist foundations */
    :host{
      --md-sys-color-background:#141218;
      --md-sys-color-on-background:#e6e1e5;
      --md-sys-color-surface:#141218;
      --md-sys-color-surface-container-low:#1d1b20;
      --md-sys-color-surface-container:#211f26;
      --md-sys-color-surface-container-high:#2b2930;
      --md-sys-color-on-surface:#e6e1e5;
      --md-sys-color-on-surface-variant:#cac4d0;
      --md-sys-color-primary:#d0bcff;
      --md-sys-color-on-primary:#381e72;
      --md-sys-color-primary-container:#4f378b;
      --md-sys-color-on-primary-container:#eaddff;
      --md-sys-color-outline:#938f99;
      --md-sys-color-outline-variant:#49454f;
      --md-sys-color-success:#9bd67d;
      --md-sys-color-warning:#ffb95c;
      --md-sys-color-error:#ffb4ab;
      --md-sys-color-info:#a8c7fa;
      --md-sys-shape-corner-small:8px;
      --md-sys-shape-corner-medium:12px;
      --md-sys-shape-corner-large:16px;
      --md-sys-shape-corner-extra-large:24px;
      --md-sys-shape-corner-full:9999px;
      --md-motion-easing-emphasized:cubic-bezier(.2,0,0,1);
      --primary-background-color:var(--md-sys-color-background);
      --primary-text-color:var(--md-sys-color-on-surface);
      --secondary-text-color:var(--md-sys-color-on-surface-variant);
      --card-background-color:var(--md-sys-color-surface-container);
      --primary-color:var(--md-sys-color-primary);
      --text-primary-color:var(--md-sys-color-on-primary);
      --divider-color:var(--md-sys-color-outline-variant);
      --success-color:var(--md-sys-color-success);
      --warning-color:var(--md-sys-color-warning);
      --error-color:var(--md-sys-color-error);
      --disabled-text-color:var(--md-sys-color-outline);
      --input-fill-color:var(--md-sys-color-surface-container-low);
      --ha-card-box-shadow:none;
      background:var(--md-sys-color-background);
      color:var(--md-sys-color-on-surface);
      font-family:Inter,"Google Sans",system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
    }
    .shell{max-width:1680px;padding:0 32px 112px;background:var(--md-sys-color-background);color:var(--md-sys-color-on-surface);}
    h1,h2,h3,.compact-brand strong{letter-spacing:0;}
    .hero.top-app-bar{height:64px;margin:0 -32px 0;padding:0 32px;border-bottom:1px solid var(--md-sys-color-outline-variant);background:var(--md-sys-color-background);}
    .compact-brand strong{font-size:1.12rem;font-weight:850;color:var(--md-sys-color-on-surface);}
    .hero-actions{height:100%;gap:20px;flex-wrap:nowrap;}
    .nav{position:relative;height:64px;min-height:64px;padding:0 4px;border:0;border-radius:0;background:transparent;color:var(--md-sys-color-on-surface-variant);font-weight:750;}
    .nav ha-icon{--mdc-icon-size:25px;}
    .nav.active,.nav:hover{background:transparent;border-color:transparent;color:var(--md-sys-color-on-surface);}
    .nav.active:after{content:"";position:absolute;left:0;right:0;bottom:0;height:3px;border-radius:3px 3px 0 0;background:var(--md-sys-color-primary);}
    button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible,a:focus-visible{outline:2px solid var(--md-sys-color-primary);outline-offset:3px;}
    .dashboard-status-line{min-height:58px;margin:0 -32px 28px;padding:0 32px;border-bottom:1px solid var(--md-sys-color-outline-variant);gap:20px;font-size:1rem;color:var(--md-sys-color-on-surface-variant);}
    .dashboard-status-line i{width:1px;height:22px;border-radius:0;background:var(--md-sys-color-outline-variant);}
    .dashboard-status-line b,.dashboard-status-line strong{color:var(--md-sys-color-on-surface);font-weight:850;}
    .dashboard-status-line .status-health{min-height:32px;padding:0;box-shadow:none;color:var(--md-sys-color-success);font-size:1.05rem;}
    .dashboard-status-line span,.dashboard-status-line strong{display:inline-flex;align-items:center;gap:8px;}
    .dashboard-status-line ha-icon{--mdc-icon-size:22px;color:currentColor;opacity:.9;}
    .dashboard-status-line .status-health.warning{box-shadow:none;color:var(--md-sys-color-warning);}
    .toolbar,.panel,.task-card,.template-card,.settings-row,.template-group,.empty,.pack-mini,.pack-card,.history-row{box-shadow:none;background:var(--md-sys-color-surface-container);border-color:var(--md-sys-color-outline-variant);}
    .toolbar.compact-dashboard-toolbar,.templates-toolbar{position:static;z-index:auto;margin:0 0 26px;padding:0;border:0;border-radius:0;background:transparent;backdrop-filter:none;box-shadow:none;grid-template-columns:minmax(0,1fr) auto;align-items:center;}
    .compact-dashboard-toolbar .dashboard-main{grid-template-columns:minmax(260px,360px) minmax(140px,160px) minmax(170px,196px) 48px auto;gap:18px;align-items:center;}
    .toolbar label span{display:none;}
    .search,select,input,textarea{border-radius:var(--md-sys-shape-corner-large);border-color:var(--md-sys-color-outline-variant);background:var(--md-sys-color-surface-container-low);color:var(--md-sys-color-on-surface);min-height:56px;padding:0 20px;}
    textarea{padding:14px 18px;}
    .search::placeholder{color:var(--md-sys-color-on-surface-variant);}
    .ghost,.primary,.icon{min-height:44px;border-radius:var(--md-sys-shape-corner-full);box-shadow:none;font-weight:800;}
    .ghost{background:transparent;border-color:var(--md-sys-color-outline-variant);color:var(--md-sys-color-on-surface);}
    .ghost:hover{background:color-mix(in srgb,var(--md-sys-color-primary) 10%,transparent);border-color:var(--md-sys-color-outline);}
    .primary{background:var(--md-sys-color-primary);color:var(--md-sys-color-on-primary);}
    .layout-switch{display:flex;align-items:center;gap:0;padding:3px;border:1px solid var(--md-sys-color-outline-variant);border-radius:var(--md-sys-shape-corner-large);background:var(--md-sys-color-surface-container-low);justify-content:flex-end;}
    .layout-switch .icon{width:auto;min-width:112px;min-height:50px;border:0;border-radius:14px;background:transparent;color:var(--md-sys-color-on-surface-variant);}
    .layout-switch .icon span{display:inline;font-weight:760;}
    .layout-switch .icon.active{background:var(--md-sys-color-primary);color:var(--md-sys-color-on-primary);border-color:transparent;}
    .quick-filter-strip{margin:-12px 0 24px;gap:8px;}
    .quick-filter-strip button{min-height:36px;background:transparent;border-color:var(--md-sys-color-outline-variant);color:var(--md-sys-color-on-surface-variant);}
    .quick-filter-strip button.active{background:color-mix(in srgb,var(--md-sys-color-primary) 16%,transparent);border-color:var(--md-sys-color-primary);color:var(--md-sys-color-on-surface);}
    .task-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:28px;}
    .task-card{min-height:440px;padding:32px;border-radius:24px;background:var(--md-sys-color-surface-container);background-image:none;border-color:var(--md-sys-color-outline-variant);grid-template-rows:auto auto auto auto 1fr auto;}
    .task-card header{align-items:flex-start;}
    .task-card>header>.task-select{left:14px;top:14px;}
    .task-card>header{padding-left:0;}
    .title-row{gap:22px;align-items:center;}
    .title-row h3{font-size:1.28rem;line-height:1.22;color:var(--md-sys-color-on-surface);}
    .title-row p,.description{color:var(--md-sys-color-on-surface-variant);}
    .icon-chip{width:74px;height:74px;border-radius:20px;background:color-mix(in srgb,var(--task-accent,var(--md-sys-color-primary)) 22%,var(--md-sys-color-surface-container-high));color:var(--md-sys-color-on-surface);}
    .icon-chip ha-icon{--mdc-icon-size:38px;}
    .status{min-height:34px;padding:0 16px;display:inline-flex;align-items:center;background:var(--md-sys-color-surface-container-high);color:var(--md-sys-color-success);}
    .status.warning{background:color-mix(in srgb,var(--md-sys-color-warning) 14%,var(--md-sys-color-surface-container));color:var(--md-sys-color-warning);}
    .status.critical,.status.overdue{background:color-mix(in srgb,var(--md-sys-color-error) 15%,var(--md-sys-color-surface-container));color:var(--md-sys-color-error);}
    .status.snoozed{background:color-mix(in srgb,var(--md-sys-color-primary) 15%,var(--md-sys-color-surface-container));color:var(--md-sys-color-primary);}
    .workflow-strip{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:-4px}
    .workflow-state,.workflow-metric{display:inline-flex;align-items:center;min-height:30px;padding:0 10px;border-radius:999px;background:var(--md-sys-color-surface-container-high);color:var(--md-sys-color-on-surface-variant);font-size:.76rem;font-weight:800}
    .workflow-state.state-ready{background:color-mix(in srgb,var(--md-sys-color-primary) 12%,var(--md-sys-color-surface-container-high));color:var(--md-sys-color-primary)}
    .workflow-state.state-in_progress{background:color-mix(in srgb,var(--md-sys-color-success) 18%,var(--md-sys-color-surface-container-high));color:var(--md-sys-color-success)}
    .workflow-state.state-blocked{background:color-mix(in srgb,var(--md-sys-color-error) 16%,var(--md-sys-color-surface-container-high));color:var(--md-sys-color-error)}
    .workflow-state.state-completed{background:color-mix(in srgb,var(--md-sys-color-primary) 16%,var(--md-sys-color-surface-container-high));color:var(--md-sys-color-primary)}
    .workflow-actions{display:flex;gap:8px;flex-wrap:wrap}
    .workflow-meta-row{display:flex;gap:10px;flex-wrap:wrap;margin-top:-2px;color:var(--md-sys-color-on-surface-variant)}
    .workflow-meta-row small{display:inline-flex;align-items:center;min-height:24px;padding:0 8px;border-radius:999px;background:var(--md-sys-color-surface-container-low)}
    .description{min-height:0;margin-top:2px;font-size:.98rem;}
    .checklist-preview{display:grid;gap:8px;padding:12px 14px;border-radius:18px;background:var(--md-sys-color-surface-container-low)}
    .checklist-preview small{color:var(--md-sys-color-on-surface-variant);font-size:.78rem}
    .checklist-item,.completion-check-item{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:10px}
    .checklist-item input,.completion-check-item input{width:18px;height:18px;min-height:0;padding:0;accent-color:var(--md-sys-color-primary)}
    .checklist-item span,.completion-check-item span{overflow-wrap:anywhere}
    .checklist-item em,.completion-check-item em{font-style:normal;color:var(--md-sys-color-primary);font-size:.74rem;font-weight:800}
    .checklist-item.done span,.completion-check-item.done span{text-decoration:line-through;color:var(--md-sys-color-on-surface-variant)}
    .progress-line{margin-top:8px;color:var(--md-sys-color-on-surface-variant);font-weight:800;}
    .progress{height:6px;background:var(--md-sys-color-surface-container-high);}
    .meta-grid{gap:0;margin-top:10px;border-top:1px solid var(--md-sys-color-outline-variant);}
    .meta-grid div{padding:22px 16px 18px 0;border-radius:0;background:transparent;border-bottom:1px solid var(--md-sys-color-outline-variant);}
    .meta-grid div:nth-child(2n){padding-left:28px;border-left:1px solid var(--md-sys-color-outline-variant);}
    .meta-grid span{font-size:.88rem;text-transform:none;color:var(--md-sys-color-on-surface-variant);letter-spacing:0;font-weight:650;}
    .meta-grid strong{font-size:1.28rem;white-space:normal;color:var(--md-sys-color-on-surface);}
    .meta-grid em{font-size:.95rem;color:var(--md-sys-color-on-surface-variant);}
    .actions{justify-content:flex-end;align-items:center;margin-top:8px;}
    .actions .icon-only{width:52px;min-width:52px;border-radius:16px;}
    .dashboard-fab{position:fixed;right:32px;bottom:32px;width:auto;height:64px;min-height:64px;padding:0 24px;display:inline-flex;gap:14px;border-radius:18px;background:var(--md-sys-color-primary);color:var(--md-sys-color-on-primary);box-shadow:none;}
    .dashboard-fab span{display:inline;font-weight:850;}
    .dashboard-fab ha-icon{--mdc-icon-size:28px;}
    .dashboard-fab:hover{box-shadow:0 0 0 8px color-mix(in srgb,var(--md-sys-color-primary) 14%,transparent);transform:translateY(-1px);}
    .page-header{display:flex;align-items:flex-end;justify-content:space-between;gap:18px;margin:28px 0 22px;padding:0;border:0;border-radius:0;background:transparent;box-shadow:none;}
    .page-header-compact{margin:18px 0 16px;}
    .page-header h1{font-size:1.72rem;line-height:1.15;color:var(--md-sys-color-on-surface);}
    .page-header p:not(.eyebrow){max-width:720px;color:var(--md-sys-color-on-surface-variant);}
    .page-header .eyebrow{color:var(--md-sys-color-primary);}
    .dialog-title-block{display:grid;gap:4px;}
    .dialog-title-block .section-hint{margin:0;color:var(--md-sys-color-on-surface-variant);}
    .dialog-meta-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
    .dialog-meta-chip{display:inline-flex;align-items:center;min-height:28px;padding:0 10px;border-radius:999px;border:1px solid var(--md-sys-color-outline-variant);background:var(--md-sys-color-surface-container-low);color:var(--md-sys-color-on-surface-variant);font-size:.78rem;font-weight:800}
    .templates-main{grid-template-columns:minmax(280px,1fr) repeat(2,max-content) max-content;gap:14px;}
    .template-filter-bar{align-items:flex-start;margin-bottom:22px;}
    .category-tabs{padding:0;gap:8px;}
    .tab{min-height:44px;border-radius:var(--md-sys-shape-corner-full);background:transparent;border-color:var(--md-sys-color-outline-variant);color:var(--md-sys-color-on-surface);}
    .tab.active{background:var(--md-sys-color-primary);color:var(--md-sys-color-on-primary);border-color:var(--md-sys-color-primary);}
    .template-group{border-radius:24px;background:transparent;border-color:var(--md-sys-color-outline-variant);}
    .template-card,.pack-mini{border-radius:20px;background:var(--md-sys-color-surface-container);background-image:none;}
    .template-card.selected,.pack-card.selected{background:color-mix(in srgb,var(--md-sys-color-primary) 12%,var(--md-sys-color-surface-container));border-color:var(--md-sys-color-primary);}
    .empty,.empty-orb,.expressive,.onboarding-hero{background:var(--md-sys-color-surface-container);background-image:none;}
    .settings-utility-bar{display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end}
    .settings-nav{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 18px;}
    .settings-nav .tab{display:inline-flex;align-items:center;gap:8px;min-height:42px;padding:0 14px}
    .settings-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;}
    .settings-section{border-radius:24px;background:var(--md-sys-color-surface-container);}
    .settings-section>header>ha-icon,.pack-mini>ha-icon,.pack-card>ha-icon,.template-preview-heading>ha-icon,.completion-heading>ha-icon{background:var(--md-sys-color-surface-container-high);color:var(--md-sys-color-primary);}
    .settings-section-footer{display:flex;justify-content:flex-end}
    .settings-inline-actions{display:flex;justify-content:flex-start}
    .check-grid .check,.toggle-grid .check{border-color:var(--md-sys-color-outline-variant);background:var(--md-sys-color-surface-container-low);border-radius:16px;}
    .check.compact{min-height:44px;padding:0 12px}
    .check.compact.icon-check{width:44px;min-width:44px;justify-content:center;padding:0}
    .check.compact.icon-check ha-icon{--mdc-icon-size:18px;color:var(--md-sys-color-primary)}
    .checklist-editor,.completion-checklist,.completion-requirements{display:grid;gap:12px}
    .checklist-editor-head,.completion-checklist-head{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
    .checklist-editor-row{display:grid;grid-template-columns:auto minmax(0,1fr) auto 44px;gap:10px;align-items:end;padding:12px;border:1px solid var(--md-sys-color-outline-variant);border-radius:18px;background:var(--md-sys-color-surface-container-low)}
    .completion-checklist{padding:14px;border-radius:20px;background:var(--md-sys-color-surface-container-low)}
    .field-head{display:inline-flex;align-items:center;gap:8px}
    .required-mark{display:inline-grid;place-items:center;width:8px;height:8px;border-radius:999px;background:var(--md-sys-color-primary);box-shadow:0 0 0 4px color-mix(in srgb,var(--md-sys-color-primary) 15%,transparent)}
    .is-required input,.is-required textarea,.is-required select{border-color:color-mix(in srgb,var(--md-sys-color-primary) 45%,var(--md-sys-color-outline-variant))}
    .schedule-callout.warning{background:color-mix(in srgb,var(--md-sys-color-error) 10%,transparent);border-color:color-mix(in srgb,var(--md-sys-color-error) 24%,var(--md-sys-color-outline-variant))}
    .schedule-callout.warning ha-icon{color:var(--md-sys-color-error)}
    .history-panel{border-radius:24px;background:transparent;border:0;padding:0;}
    .history-summary-strip{position:static;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;margin:0 0 14px;padding:0;border:0;background:transparent}
    .history-summary-strip div{display:grid;grid-template-columns:36px 1fr auto;gap:10px;align-items:center;padding:12px 14px;border:1px solid var(--md-sys-color-outline-variant);border-radius:18px;background:var(--md-sys-color-surface-container)}
    .history-toolbar{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;align-items:end;margin-bottom:16px;}
    .history-search-field{display:grid;gap:5px}
    .history-search-input{max-width:100%}
    .history-scope.segmented{grid-column:1/-1;justify-self:start;display:flex;gap:0;padding:3px;border:1px solid var(--md-sys-color-outline-variant);border-radius:var(--md-sys-shape-corner-large);background:var(--md-sys-color-surface-container-low);}
    .history-scope button{min-height:42px;padding:0 16px;border:0;border-radius:13px;background:transparent;color:var(--md-sys-color-on-surface-variant);font-weight:800;}
    .history-scope button.active{background:var(--md-sys-color-primary);color:var(--md-sys-color-on-primary);}
    .history-list{gap:10px;}
    .history-row{border-radius:20px;background:var(--md-sys-color-surface-container);padding:18px;border:1px solid var(--md-sys-color-outline-variant);}
    .history-row>ha-icon{display:grid;place-items:center;width:44px;height:44px;padding:10px;border-radius:15px;background:var(--md-sys-color-surface-container-high);color:var(--md-sys-color-primary);flex:0 0 auto;}
    .history-row.completed>ha-icon{color:var(--md-sys-color-success);}
    .history-row.deleted>ha-icon{color:var(--md-sys-color-error);}
    .history-summary ha-icon{color:var(--md-sys-color-primary);}
    .history-summary span{color:var(--md-sys-color-on-surface-variant);font-size:.86rem;}
    .history-summary strong{color:var(--md-sys-color-on-surface);}
    .timeline-view{padding-left:78px;gap:12px;}
    .timeline-view:before{left:32px;top:18px;bottom:18px;background:var(--md-sys-color-outline-variant);}
    .timeline-entry{display:block;padding:0;position:relative;}
    .timeline-marker{left:-52px;top:34px;width:20px;height:20px;background:transparent;box-shadow:none;border:1px solid var(--md-sys-color-outline);}
    .timeline-marker span{display:block;width:10px;height:10px;margin:4px;border-radius:50%;background:var(--md-sys-color-info);}
    .timeline-entry.ok .timeline-marker span,.timeline-entry.completed .timeline-marker span{background:var(--md-sys-color-success);}
    .timeline-entry.warning .timeline-marker span{background:var(--md-sys-color-warning);}
    .timeline-entry.critical .timeline-marker span,.timeline-entry.overdue .timeline-marker span{background:var(--md-sys-color-error);}
    .timeline-card{display:grid;grid-template-columns:74px minmax(220px,1.5fr) minmax(140px,.55fr) minmax(120px,.5fr) minmax(160px,.7fr) auto;gap:18px;align-items:center;min-height:96px;padding:16px 20px;border-radius:20px;background:var(--md-sys-color-surface-container);border:1px solid var(--md-sys-color-outline-variant);}
    .timeline-main strong{display:block;font-size:1.12rem;color:var(--md-sys-color-on-surface);}
    .timeline-main small,.timeline-date span{display:block;color:var(--md-sys-color-on-surface-variant);margin-top:4px;}
    .timeline-date{padding:0;color:var(--md-sys-color-on-surface);}
    .timeline-progress{display:grid;grid-template-columns:46px minmax(90px,1fr);gap:10px;align-items:center;}
    .timeline-actions{display:flex;gap:8px;justify-content:flex-end;}
    @media(max-width:1180px){
      .task-grid,.settings-grid{grid-template-columns:1fr;}
      .history-summary-strip{grid-template-columns:repeat(2,minmax(0,1fr));}
      .timeline-card{grid-template-columns:58px minmax(180px,1fr) minmax(130px,auto) auto;}
      .timeline-card .status,.timeline-progress{grid-column:auto;}
    }
    @media(max-width:760px){
      .shell{padding:0 16px 104px;}
      .hero.top-app-bar{margin:0 -16px;padding:0 16px;height:auto;min-height:64px;align-items:center;}
      .hero-actions{gap:8px;display:grid;grid-template-columns:repeat(4,1fr);height:auto;}
      .nav{height:56px;min-height:56px;font-size:.78rem;}
      .nav span{display:none;}
      .dashboard-status-line{margin:0 -16px 20px;padding:12px 16px;min-height:auto;gap:12px;}
      .dashboard-status-line i{display:none;}
      .compact-dashboard-toolbar,.templates-toolbar{grid-template-columns:1fr;}
      .compact-dashboard-toolbar .dashboard-main,.templates-main,.history-toolbar{grid-template-columns:1fr;}
      .layout-switch{justify-content:stretch;}
      .layout-switch .icon{min-width:0;flex:1;}
      .layout-switch .icon span{display:none;}
      .task-card{min-height:0;padding:22px;}
      .icon-chip{width:58px;height:58px;}
      .icon-chip ha-icon{--mdc-icon-size:30px;}
      .checklist-editor-row{grid-template-columns:1fr}
      .meta-grid div:nth-child(2n){padding-left:16px;}
      .dashboard-fab{right:16px;bottom:18px;height:58px;min-height:58px;padding:0 20px;}
      .page-header{margin:22px 0 18px;}
      .settings-utility-bar{display:grid;grid-template-columns:1fr;}
      .history-scope.segmented{justify-self:stretch;}
      .history-scope button{flex:1;padding:0 8px;}
      .history-summary-strip{grid-template-columns:1fr;}
      .timeline-view{padding-left:38px;}
      .timeline-view:before{left:16px;}
      .timeline-marker{left:-32px;}
      .timeline-card{grid-template-columns:50px minmax(0,1fr) auto;gap:12px;}
      .timeline-date,.timeline-progress{grid-column:2/-1;}
      .timeline-actions{grid-column:1/-1;justify-content:flex-end;}
    }
    .task-grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}
    .task-card{min-height:332px;padding:22px}
    .title-row{gap:16px}
    .title-row h3{font-size:1.08rem}
    .description{font-size:.92rem}
    .meta-grid strong{font-size:1.05rem}
    .bulk-toolbar.floating-bulk-toolbar{position:fixed;left:32px;right:32px;bottom:108px;z-index:2147482950;display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:14px 16px;border-radius:22px;background:color-mix(in srgb,var(--md-sys-color-surface-container) 95%,black);box-shadow:0 20px 42px rgb(0 0 0 / 34%)}
    .bulk-toolbar-head{display:grid;gap:4px;min-width:180px;margin-right:auto}
    .bulk-toolbar-head span{color:var(--md-sys-color-on-surface-variant);font-size:.84rem}
    .bulk-toolbar-field{display:grid;gap:5px;min-width:180px;max-width:220px;color:var(--md-sys-color-on-surface-variant);font-size:.75rem;font-weight:800}
    .bulk-toolbar-field span{display:block}
    .bulk-toolbar-secondary{display:flex;gap:8px;flex-wrap:wrap}
    .templates-workbench{display:grid;gap:14px;padding:14px 16px;margin-bottom:18px}
    .templates-toolbar-main{display:grid;grid-template-columns:minmax(260px,520px) minmax(0,1fr);gap:12px;align-items:center;justify-content:space-between}
    .template-selection-actions{display:flex;justify-content:flex-end;gap:10px;flex-wrap:wrap}
    .template-filter-bar{margin:0;display:grid;gap:10px}
    .category-tabs{display:flex;gap:8px;flex-wrap:wrap;overflow:visible}
    .category-tabs .tab{display:inline-flex;align-items:center;gap:8px;min-height:38px;padding:0 12px}
    .category-tabs .tab ha-icon{--mdc-icon-size:18px}
    .template-secondary-filters{display:grid;grid-template-columns:auto auto auto;justify-content:space-between;align-items:end;gap:12px}
    .template-results-meta{display:inline-flex;align-items:center;gap:10px;min-height:40px;padding:0 12px;border:1px solid var(--md-sys-color-outline-variant);border-radius:999px;background:var(--md-sys-color-surface-container-low)}
    .template-results-meta strong{color:var(--md-sys-color-on-surface)}
    .template-results-meta span,.template-results-meta em{font-style:normal;color:var(--md-sys-color-on-surface-variant)}
    .template-group-title{display:flex;align-items:center;gap:12px}
    .template-group-title small{display:block;margin-bottom:2px;color:var(--md-sys-color-on-surface-variant);font-size:.76rem;font-weight:800;letter-spacing:0;text-transform:none}
    .template-group-icon{display:grid;place-items:center;width:42px;height:42px;border-radius:14px;background:var(--md-sys-color-surface-container-high);color:var(--md-sys-color-primary)}
    .template-group-icon ha-icon{--mdc-icon-size:20px}
    .template-card.compact small{display:flex;align-items:center;gap:7px;line-height:1.35}
    .template-card.compact small ha-icon{--mdc-icon-size:16px;color:var(--md-sys-color-primary)}
    .starter-count{display:inline-grid;place-items:center;min-width:28px;height:28px;padding:0 10px;border-radius:999px;background:var(--md-sys-color-surface-container-high);color:var(--md-sys-color-primary);font-size:.82rem}
    .starter-toggle{min-height:40px}
    .pack-strip{grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
    .pack-mini{grid-template-columns:40px 1fr auto;align-items:start;padding:16px}
    .pack-mini-action{min-height:40px;white-space:nowrap;align-self:center}
    .starter-packs.collapsed{padding-bottom:10px}
    .settings-stack{display:grid;gap:18px}
    .settings-section-grid{display:grid;gap:16px}
    .settings-section-grid.two-column{grid-template-columns:repeat(2,minmax(0,1fr))}
    .settings-section-grid.three-column{grid-template-columns:repeat(3,minmax(0,1fr))}
    .settings-subpanel{display:grid;gap:12px;padding:16px;border:1px solid var(--md-sys-color-outline-variant);border-radius:18px;background:var(--md-sys-color-surface-container-low)}
    .settings-subpanel h4{font-size:1rem;color:var(--md-sys-color-on-surface)}
    .platform-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
    .settings-ordering-head{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:16px}
    .settings-row{display:grid;grid-template-columns:40px 32px minmax(0,1fr) 36px 36px 36px 36px;gap:10px;align-items:center}
    .history-results-meta{display:flex;align-items:center;gap:10px;margin:0 0 16px;padding:0 4px;color:var(--md-sys-color-on-surface-variant)}
    .history-results-meta strong{font-size:1.15rem;color:var(--md-sys-color-on-surface)}
    .history-list{display:grid;gap:18px}
    .history-day-group{display:grid;gap:10px}
    .history-day-header{display:flex;align-items:center;justify-content:space-between;padding:0 4px}
    .history-day-header strong{font-size:.95rem;color:var(--md-sys-color-on-surface)}
    .history-day-header span{display:inline-grid;place-items:center;min-width:30px;height:30px;padding:0 10px;border-radius:999px;background:var(--md-sys-color-surface-container-high);color:var(--md-sys-color-on-surface-variant)}
    .history-day-entries{display:grid;gap:10px}
    .history-row{display:grid;grid-template-columns:44px minmax(0,1fr) auto;align-items:start;gap:14px}
    .history-title{display:grid;gap:6px}
    .history-meta-strip{display:flex;gap:8px;flex-wrap:wrap}
    .history-event-type,.history-source,.history-time{display:inline-flex;align-items:center;min-height:28px;padding:0 10px;border-radius:999px;background:var(--md-sys-color-surface-container-high);font-size:.78rem}
    .history-summary-line{margin:0;color:var(--md-sys-color-on-surface)}
    .history-change-head,.history-change-row{display:grid;grid-template-columns:minmax(120px,160px) 1fr auto 1fr;gap:10px;align-items:start}
    .history-change-head{margin-top:10px;color:var(--md-sys-color-on-surface-variant);font-size:.78rem}
    .history-change-row{padding:10px 0;border-top:1px solid color-mix(in srgb,var(--md-sys-color-outline-variant) 70%,transparent)}
    .history-change-row code{padding:8px 10px;border-radius:12px;background:var(--md-sys-color-surface-container-low);white-space:pre-wrap}
    @media(max-width:1500px){.task-grid,.pack-strip{grid-template-columns:repeat(3,minmax(0,1fr))}}
    @media(max-width:1180px){.task-grid,.pack-strip,.settings-section-grid.two-column,.settings-section-grid.three-column,.history-summary-strip{grid-template-columns:repeat(2,minmax(0,1fr))}.templates-toolbar-main{grid-template-columns:1fr}.template-selection-actions{justify-content:flex-start}.template-secondary-filters{grid-template-columns:1fr 1fr}.template-results-meta{grid-column:1/-1;justify-content:flex-start}.bulk-toolbar.floating-bulk-toolbar{bottom:96px}}
    @media(max-width:760px){.bulk-toolbar.floating-bulk-toolbar{left:16px;right:16px;bottom:86px}.pack-strip,.settings-section-grid.two-column,.settings-section-grid.three-column,.platform-grid,.template-secondary-filters{grid-template-columns:1fr}.settings-row{grid-template-columns:32px 28px minmax(0,1fr) 36px 36px;gap:8px}.settings-row [data-edit]{grid-column:4}.settings-row [data-delete]{grid-column:5}.settings-row [data-move$=':up'],.settings-row [data-move$=':down']{grid-row:2}.task-grid{grid-template-columns:1fr}}
    @media(prefers-reduced-motion:reduce){
      *,*:before,*:after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important;}
    }
  </style>`;
  }
});

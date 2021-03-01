import {Clock} from "./model/Clock.js";
import {ClockDomView} from "./view/ClockDomView.js";
import {ClockSvgView} from "./view/ClockSvgView.js";
import {ClockCanvasView} from "./view/ClockCanvasView.js";
import {ClockController} from "./controller/ClockController.js";

/**
 * @type {Clock}
 * New York Clock
 */
const newYorkClock = new Clock('America/New_York');
const newYorkView = new ClockDomView(300, 'new-york', newYorkClock);
const newYorkController = new ClockController();
newYorkView.clockInit();
newYorkClock.getView(newYorkView);
newYorkClock.getTime();
newYorkController.action(newYorkClock, 'new-york');

/**
 * @type {Clock}
 * London Clock
 */
const londonClock = new Clock('Europe/London');
const londonView = new ClockDomView(300,'london', londonClock);
const londonController = new ClockController();
londonClock.getView(londonView);
londonView.clockInit();
londonClock.getTime();
londonController.action(londonClock, 'london');

/**
 * @type {Clock}
 * Berlin Clock
 */
const berlinClock = new Clock('Europe/Berlin');
const berlinView = new ClockSvgView(300, 'berlin', berlinClock);
const berlinController = new ClockController();
berlinClock.getView(berlinView);
berlinView.clockInit();
berlinClock.getTime();
berlinController.action(berlinClock, 'berlin');

/**
 * @type {Clock}
 * Minsk Clock
 */
const minskClock = new Clock('Europe/Minsk');
const minskView = new ClockSvgView(300, 'minsk', minskClock);
const minskController = new ClockController();
minskClock.getView(minskView);
minskView.clockInit();
minskClock.getTime();
minskController.action(minskClock, 'minsk')

/**
 * @type {Clock}
 * Tokyo Clock
 */
const tokyoClock = new Clock('Asia/Tokyo');
const tokyoView = new ClockCanvasView(300, 'tokyo', tokyoClock);
const tokyoController = new ClockController();
tokyoClock.getView(tokyoView)
tokyoView.clockInit();
tokyoClock.getTime();
tokyoController.action(tokyoClock, 'tokyo')

/**
 * @type {Clock}
 * Moscow Clock
 */
const moscowClock = new Clock('Europe/Moscow');
const moscowView = new ClockCanvasView(300, 'moscow', moscowClock);
const moscowController = new ClockController();
moscowClock.getView(moscowView);
moscowView.clockInit();
moscowClock.getTime();
moscowController.action(moscowClock, 'moscow');

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
System.register("Renderer", [], function (exports_1, context_1) {
    "use strict";
    var Renderer;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Renderer = /** @class */ (function () {
                function Renderer(elem) {
                    this.elem = elem;
                    var ctx = elem.getContext("2d");
                    if (ctx) {
                        this.ctx = ctx;
                    }
                    else {
                        throw new Error("ctx must be a canvas element with 2d context");
                    }
                }
                Renderer.prototype.drawRectangle = function (x, y, w, h) {
                    this.ctx.beginPath();
                    this.ctx.rect(x, y, w, h);
                    this.ctx.stroke();
                };
                ;
                Renderer.prototype.resetCanvas = function () {
                    this.ctx.clearRect(0, 0, this.elem.width, this.elem.height);
                };
                ;
                Renderer.prototype.getCanvasHeight = function () {
                    return this.elem.height;
                };
                Renderer.prototype.getCanvasWidth = function () {
                    return this.elem.width;
                };
                return Renderer;
            }());
            exports_1("default", Renderer);
        }
    };
});
System.register("ScoreBoard", [], function (exports_2, context_2) {
    "use strict";
    var ScoreBoard;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            ScoreBoard = /** @class */ (function () {
                function ScoreBoard(renderer) {
                    this.renderer = renderer;
                    this.score = [0, 0];
                }
                ScoreBoard.prototype.rightScored = function () {
                    this.score[1]++;
                    console.log(this.score);
                };
                ScoreBoard.prototype.leftScored = function () {
                    this.score[0]++;
                    console.log(this.score);
                };
                ScoreBoard.prototype.update = function () {
                    //not sure how to render this yet
                };
                return ScoreBoard;
            }());
            exports_2("default", ScoreBoard);
        }
    };
});
System.register("Point", [], function (exports_3, context_3) {
    "use strict";
    var Point;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            Point = /** @class */ (function () {
                function Point(x, y) {
                    this.x = x;
                    this.y = y;
                }
                Point.prototype.add = function (other) {
                    if (!(this.x && this.y)) {
                        throw new Error("X or Y is undefined x: " + this.x + " y: " + this.y);
                    }
                    if (!(other.x && other.y)) {
                        throw new Error("X or Y is undefined on other x: " + this.x + " y: " + this.y);
                    }
                    return new Point(other.x + this.x, other.y + this.y);
                };
                Point.prototype.getDefined = function (val) {
                    if (val != undefined) {
                        return val;
                    }
                    else {
                        throw new Error("Cannot get undefined");
                    }
                };
                Point.prototype.getX = function () {
                    return this.getDefined(this.x);
                };
                Point.prototype.getY = function () {
                    return this.getDefined(this.y);
                };
                return Point;
            }());
            exports_3("default", Point);
        }
    };
});
System.register("Vector", ["Point"], function (exports_4, context_4) {
    "use strict";
    var Point_1, Vector;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (Point_1_1) {
                Point_1 = Point_1_1;
            }
        ],
        execute: function () {
            Vector = /** @class */ (function (_super) {
                __extends(Vector, _super);
                function Vector() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Vector.prototype.times = function (value) {
                    return new Vector(this.x * value, this.y * value);
                };
                return Vector;
            }(Point_1["default"]));
            exports_4("default", Vector);
        }
    };
});
System.register("Ball", ["Point", "Vector"], function (exports_5, context_5) {
    "use strict";
    var Point_2, Vector_1, Ball;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (Point_2_1) {
                Point_2 = Point_2_1;
            },
            function (Vector_1_1) {
                Vector_1 = Vector_1_1;
            }
        ],
        execute: function () {
            Ball = /** @class */ (function () {
                function Ball(renderer, clock, scoreboard) {
                    var _this = this;
                    this.renderer = renderer;
                    this.clock = clock;
                    this.scoreboard = scoreboard;
                    this.ballSize = 30;
                    this.initialVelocity = new Vector_1["default"](-60, 40); // px/s
                    this.initialPostition = new Point_2["default"](500, 250);
                    this.velocity = new Vector_1["default"](this.initialVelocity.x, this.initialVelocity.y);
                    this.position = new Point_2["default"](this.initialPostition.x, this.initialPostition.y);
                    this.drawBall = function (point) {
                        _this.renderer.drawRectangle(point.x, point.y, _this.ballSize, _this.ballSize);
                    };
                }
                Ball.prototype.applyVelocity = function () {
                    var seconds = this.clock / 1000;
                    var changePos = this.velocity.times(seconds);
                    this.position = this.position.add(changePos);
                };
                Ball.prototype.checkSideCollisions = function () {
                    var renderer = this.renderer;
                    var leftScored = this.position.x >= renderer.getCanvasWidth() - this.ballSize;
                    var rightScored = this.position.x <= 0;
                    if (leftScored || rightScored) {
                        this.position = this.initialPostition;
                        this.velocity.x = -this.velocity.y;
                        if (leftScored) {
                            this.scoreboard.leftScored();
                        }
                        else {
                            this.scoreboard.rightScored();
                        }
                    }
                    if (this.position.y >= renderer.getCanvasHeight() - this.ballSize ||
                        this.position.y <= 0) {
                        this.velocity.y = -this.velocity.y;
                    }
                };
                Ball.prototype.update = function () {
                    this.applyVelocity();
                    this.checkSideCollisions();
                    this.drawBall(this.position);
                };
                Ball.prototype.getPosition = function () {
                    return this.position;
                };
                return Ball;
            }());
            exports_5("default", Ball);
        }
    };
});
System.register("Paddle", ["Point"], function (exports_6, context_6) {
    "use strict";
    var Point_3, Paddle;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (Point_3_1) {
                Point_3 = Point_3_1;
            }
        ],
        execute: function () {
            Paddle = /** @class */ (function () {
                function Paddle(renderer, keyup, keydown, position, clock) {
                    var _this = this;
                    this.renderer = renderer;
                    this.keyup = keyup;
                    this.keydown = keydown;
                    this.position = position;
                    this.clock = clock;
                    this.paddleWidth = 50;
                    this.paddleHeight = 100;
                    this.paddleSpeed = 50; // px per s
                    this.downKeyPressed = false;
                    this.upKeyPressed = false;
                    this.drawPaddle = function (point) {
                        _this.renderer.drawRectangle(point.x, point.y, _this.paddleWidth, _this.paddleHeight);
                    };
                    this.position.x = this.position.x ? this.position.x : this.renderer.getCanvasWidth() - this.paddleWidth - 10;
                    document.addEventListener("keydown", function (event) {
                        _this.keydownEventHandler(event, true);
                    });
                    document.addEventListener("keyup", function (event) {
                        _this.keydownEventHandler(event, false);
                    });
                }
                Paddle.prototype.updatePosition = function () {
                    var change = this.paddleSpeed / this.clock;
                    var downKeyPressed = this.downKeyPressed ? 1 : 0;
                    var upKeyPressed = this.upKeyPressed ? 1 : 0;
                    var changeY = downKeyPressed * change +
                        upKeyPressed * -change;
                    this.position = this.position.add(new Point_3["default"](0, changeY));
                };
                Paddle.prototype.update = function () {
                    this.updatePosition();
                    this.drawPaddle(this.position);
                };
                Paddle.prototype.keydownEventHandler = function (event, down) {
                    event.preventDefault();
                    switch (event.keyCode) {
                        case this.keydown:
                            this.downKeyPressed = down;
                            break;
                        case this.keyup:
                            this.upKeyPressed = down;
                            break;
                    }
                };
                Paddle.prototype.getPosition = function () {
                    return this.position;
                };
                Paddle.prototype.getHeightWidth = function () {
                    return [this.paddleHeight, this.paddleWidth];
                };
                return Paddle;
            }());
            exports_6("default", Paddle);
        }
    };
});
System.register("BallPaddleCollisionDetector", [], function (exports_7, context_7) {
    "use strict";
    var BallPaddleCollisionDetector;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [],
        execute: function () {
            BallPaddleCollisionDetector = /** @class */ (function () {
                function BallPaddleCollisionDetector(ball, leftPaddle, rightPaddle) {
                    this.ball = ball;
                    this.leftPaddle = leftPaddle;
                    this.rightPaddle = rightPaddle;
                }
                BallPaddleCollisionDetector.prototype.pointInRectangle = function (point, rect) {
                };
                BallPaddleCollisionDetector.prototype.checkPaddleCollision = function (paddle, ball) {
                    var paddlePosition = paddle.getPosition();
                    var paddleHeightWidth = paddle.getHeightWidth();
                    var paddleRectangle = [paddlePosition];
                    var ballLocation = this.ball.getPosition();
                    var topLeftCorner = ballLocation;
                    var ballX = ball.position.getX();
                    var ballY = ball.position.getY();
                    var corners = [[ballX, ballY],
                        [ballX + ball.ballSize, ballY],
                        [ballX, ballY + ball.ballSize],
                        [ballX + ball.ballSize, ballY + ball.ballSize]];
                    corners.map(function (corner) {
                    });
                };
                return BallPaddleCollisionDetector;
            }());
            exports_7("default", BallPaddleCollisionDetector);
        }
    };
});
System.register("GameStage", ["Ball", "ScoreBoard", "Paddle", "Point"], function (exports_8, context_8) {
    "use strict";
    var Ball_1, ScoreBoard_1, Paddle_1, Point_4, GameStage;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (Ball_1_1) {
                Ball_1 = Ball_1_1;
            },
            function (ScoreBoard_1_1) {
                ScoreBoard_1 = ScoreBoard_1_1;
            },
            function (Paddle_1_1) {
                Paddle_1 = Paddle_1_1;
            },
            function (Point_4_1) {
                Point_4 = Point_4_1;
            }
        ],
        execute: function () {
            GameStage = /** @class */ (function () {
                function GameStage(renderer, clock) {
                    this.clock = clock;
                    this.previousTime = new Date().getMilliseconds();
                    var half = renderer.getCanvasHeight() / 2;
                    this.leftPaddle = new Paddle_1["default"](renderer, 87, 83, new Point_4["default"](10, half), clock);
                    this.rightPaddle = new Paddle_1["default"](renderer, 38, 40, new Point_4["default"](undefined, half), clock);
                    this.scoreboard = new ScoreBoard_1["default"](renderer);
                    this.ball = new Ball_1["default"](renderer, this.clock, this.scoreboard);
                }
                GameStage.prototype.getTimeElapsed = function () {
                    var currentTime = new Date().getMilliseconds();
                    var timeElapsed = currentTime - this.previousTime;
                    this.previousTime = currentTime;
                    return timeElapsed;
                };
                GameStage.prototype.next = function () {
                    this.ball.update();
                    this.rightPaddle.update();
                    this.leftPaddle.update();
                    this.scoreboard.update();
                };
                return GameStage;
            }());
            exports_8("default", GameStage);
        }
    };
});
System.register("Game", ["Renderer", "GameStage"], function (exports_9, context_9) {
    "use strict";
    var Renderer_1, GameStage_1, Game;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (Renderer_1_1) {
                Renderer_1 = Renderer_1_1;
            },
            function (GameStage_1_1) {
                GameStage_1 = GameStage_1_1;
            }
        ],
        execute: function () {
            Game = /** @class */ (function () {
                function Game() {
                    var _this = this;
                    this.clock = 20; // adjusts frame rate
                    var elem = document.getElementById("pong");
                    this.renderer = new Renderer_1["default"](elem);
                    this.currentStage = new GameStage_1["default"](this.renderer, this.clock);
                    document.addEventListener("nextFrame", function () {
                        _this.next();
                    });
                }
                Game.prototype.next = function () {
                    this.renderer.resetCanvas();
                    this.currentStage.next();
                    setTimeout(function () {
                        var event = new CustomEvent("nextFrame");
                        document.dispatchEvent(event);
                    }, this.clock);
                };
                return Game;
            }());
            exports_9("default", Game);
        }
    };
});
System.register("pong", ["Game"], function (exports_10, context_10) {
    "use strict";
    var Game_1, game;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [
            function (Game_1_1) {
                Game_1 = Game_1_1;
            }
        ],
        execute: function () {
            game = new Game_1["default"]();
            game.next();
        }
    };
});

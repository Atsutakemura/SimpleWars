class CameraSystem {
    constructor(game) {
		const ECameraMovement = {
			KEYS: 0,
			MOUSE: 1,
		}

		// This creates and positions a free camera (non-mesh)
		const camera = new BABYLON.UniversalCamera("camera:rts", new BABYLON.Vector3(-14, 20, 0), game.scene);

		// This targets the camera to scene origin
		camera.setTarget(new BABYLON.Vector3(0, 0, 0));
		camera.mode = BABYLON.Camera.PERSPECTIVE_CAMERA;
		camera.speed = 0.4;
		camera.fov = 1.0;
		camera.metadata = {
			// mouse & keyboard properties
			// Set by camera inputs. Defines, which input moves the camera (mouse or keys)
			movedBy: null,
			// target position, the camera should be moved to
			targetPosition: camera.position.clone(),
			// radius, that is used to rotate camera
			// initial value dependent from camera position and camera target
			radius: new BABYLON.Vector3(camera.position.x, 0, camera.position.z).subtract(new BABYLON.Vector3(camera.target.x, 0, camera.target.z)).length(),
			// helper variable, to rotate camera
			rotation: BABYLON.Tools.ToRadians(180) + camera.rotation.y,
			// speed for rotation
			rotationSpeed: 0.02,
			// boundaries for x and z
			minX: -.5*game.mapSize,
			maxX: .5*game.mapSize,
			minZ: -.5*game.mapSize,
			maxZ: .5*game.mapSize,

			// mousewheel properties
			// similar to targetPosition, targetZoom contains the target value for the zoom
			targetZoom: camera.fov,
			// zoom boundaries
			maxZoom: 1.4,
			minZoom: 0.5,
			// speed for zoom
			zoom: 0.005,
			// zoom distance per mouse wheel interaction
			zoomSteps: 0.2,
		}
		camera.inputs.clear();
		camera.attachControl(game.canvas, true);

		// Gui to move camera with mouse 
		const gui = new BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('ui');   


		/**
		 * ========================================
		 * = Moving camera in edge areas with mouse
		 * ========================================
		 */
		var FreeCameraMouseInput = function () {
			this._disableEdgeScroll = () => {
				this._topEdgeScroll = false;
				this._rightEdgeScroll = false;
				this._bottomEdgeScroll = false;
				this._leftEdgeScroll = false;
			}

			// enable edge areas
			this._enabled = true;

			// state, where the mouse is
			this._topEdgeScroll = false;
			this._rightEdgeScroll = false;
			this._bottomEdgeScroll = false;
			this._leftEdgeScroll = false;

			// transparency of the edge areas
			this._alphaEdgeScroll = 1.0;

			// width/height in percentage of the edge areas
			this._widthEdgeScroll = 0.05;
			this._heightEdgeScroll = 0.05;

			// gui elements for edge areas
			this.topEdge = new BABYLON.GUI.Rectangle();
			this.topRightCorner = new BABYLON.GUI.Rectangle();
			this.rightEdge = new BABYLON.GUI.Rectangle();
			this.bottomRightCorner = new BABYLON.GUI.Rectangle();
			this.bottomEdge = new BABYLON.GUI.Rectangle();
			this.bottomLeftCorner = new BABYLON.GUI.Rectangle();
			this.leftEdge = new BABYLON.GUI.Rectangle();
			this.topLeftCorner = new BABYLON.GUI.Rectangle();
		};

		FreeCameraMouseInput.prototype.attachControl = function (noPreventDefault) {
			var _this = this;
			var engine = this.camera.getEngine();
			var element = engine.getInputElement();
			element && element.addEventListener("contextmenu", this.onContextMenu.bind(this), false);

			// top edge area
			this.topEdge.width = 1 - 2*this._heightEdgeScroll;
			this.topEdge.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
			this.topEdge.height = this._heightEdgeScroll;
			this.topEdge.isPointerBlocker = false;
			this.topEdge.thickness = 0;
			this.topEdge.isEnabled = this._enabled;
			this.topEdge.onPointerEnterObservable.add((eventData, eventState) => {
				_this._disableEdgeScroll();
				_this._topEdgeScroll = true;
				if (_this.camera.metadata.movedBy === null ) {
					_this.camera.metadata.movedBy = ECameraMovement.MOUSE;
				}
			});
			this.topEdge.onPointerOutObservable.add((eventData, eventState) => {
			   _this._disableEdgeScroll();
			});
			gui.addControl(this.topEdge);

			// top right corner area
			this.topRightCorner.height = this._heightEdgeScroll;
			this.topRightCorner.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
			this.topRightCorner.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
			this.topRightCorner.width = this._widthEdgeScroll;
			this.topRightCorner.isPointerBlocker = false;
			this.topRightCorner.thickness = 0;
			this.topRightCorner.isEnabled = this._enabled;
			this.topRightCorner.onPointerEnterObservable.add((eventData, eventState) => {
				_this._disableEdgeScroll();
				_this._topEdgeScroll = true;
				_this._rightEdgeScroll = true;
				if (_this.camera.metadata.movedBy === null ) {
					_this.camera.metadata.movedBy = ECameraMovement.MOUSE;
				}
			});
			this.topRightCorner.onPointerOutObservable.add((eventData, eventState) => {
				_this._disableEdgeScroll();
			});
			gui.addControl(this.topRightCorner);
			
			// right edge area
			this.rightEdge.height = 1 - 2*this._widthEdgeScroll;
			this.rightEdge.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
			this.rightEdge.width = this._widthEdgeScroll;
			this.rightEdge.isPointerBlocker = false;
			this.rightEdge.thickness = 0;
			this.rightEdge.isEnabled = this._enabled;
			this.rightEdge.onPointerEnterObservable.add((eventData, eventState) => {
				_this._disableEdgeScroll();
				_this._rightEdgeScroll = true;
				if (_this.camera.metadata.movedBy === null ) {
					_this.camera.metadata.movedBy = ECameraMovement.MOUSE;
				}
			});
			this.rightEdge.onPointerOutObservable.add((eventData, eventState) => {
				_this._disableEdgeScroll();
			});
			gui.addControl(this.rightEdge);
			
			// bottom right corner area
			this.bottomRightCorner.height = this._heightEdgeScroll;
			this.bottomRightCorner.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
			this.bottomRightCorner.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
			this.bottomRightCorner.width = this._widthEdgeScroll;
			this.bottomRightCorner.isPointerBlocker = false;
			this.bottomRightCorner.thickness = 0;
			this.bottomRightCorner.isEnabled = this._enabled;
			this.bottomRightCorner.onPointerEnterObservable.add((eventData, eventState) => {
				_this._disableEdgeScroll();
				_this._bottomEdgeScroll = true;
				_this._rightEdgeScroll = true;
				if (_this.camera.metadata.movedBy === null ) {
					_this.camera.metadata.movedBy = ECameraMovement.MOUSE;
				}
			});
			this.bottomRightCorner.onPointerOutObservable.add((eventData, eventState) => {
				_this._disableEdgeScroll();
			});
			gui.addControl(this.bottomRightCorner);

			// bottom edge area
			this.bottomEdge.width = 1 - 2*this._heightEdgeScroll;
			this.bottomEdge.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
			this.bottomEdge.height = this._heightEdgeScroll;
			this.bottomEdge.isPointerBlocker = false;
			this.bottomEdge.thickness = 0;
			this.bottomEdge.isEnabled = this._enabled;
			this.bottomEdge.onPointerEnterObservable.add((eventData, eventState) => {
				_this._disableEdgeScroll();
				_this._bottomEdgeScroll = true;
				if (_this.camera.metadata.movedBy === null ) {
					_this.camera.metadata.movedBy = ECameraMovement.MOUSE;
				}
			});
			this.bottomEdge.onPointerOutObservable.add((eventData, eventState) => {
				_this._disableEdgeScroll();
			});
			gui.addControl(this.bottomEdge);

			// bottom left corner area
			this.bottomLeftCorner.height = this._heightEdgeScroll;
			this.bottomLeftCorner.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
			this.bottomLeftCorner.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
			this.bottomLeftCorner.width = this._widthEdgeScroll;
			this.bottomLeftCorner.isPointerBlocker = false;
			this.bottomLeftCorner.thickness = 0;
			this.bottomLeftCorner.isEnabled = this._enabled;
			this.bottomLeftCorner.onPointerEnterObservable.add((eventData, eventState) => {
				_this._disableEdgeScroll();
				_this._bottomEdgeScroll = true;
				_this._leftEdgeScroll = true;
				if (_this.camera.metadata.movedBy === null ) {
					_this.camera.metadata.movedBy = ECameraMovement.MOUSE;
				}
			});
			this.bottomLeftCorner.onPointerOutObservable.add((eventData, eventState) => {
				_this._disableEdgeScroll();
			});
			gui.addControl(this.bottomLeftCorner);

			// left edge area
			this.leftEdge.height = 1 - 2*this._widthEdgeScroll;
			this.leftEdge.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
			this.leftEdge.width = this._widthEdgeScroll;
			this.leftEdge.isPointerBlocker = false;
			this.leftEdge.thickness = 0;
			this.leftEdge.isEnabled = this._enabled;
			this.leftEdge.onPointerEnterObservable.add((eventData, eventState) => {
				_this._disableEdgeScroll();
				_this._leftEdgeScroll = true;
				if (_this.camera.metadata.movedBy === null ) {
					_this.camera.metadata.movedBy = ECameraMovement.MOUSE;
				}
			});
			this.leftEdge.onPointerOutObservable.add((eventData, eventState) => {
				_this._disableEdgeScroll();
			});
			gui.addControl(this.leftEdge);

			// top left corner area
			this.topLeftCorner.height = this._heightEdgeScroll;
			this.topLeftCorner.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
			this.topLeftCorner.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
			this.topLeftCorner.width = this._widthEdgeScroll;
			this.topLeftCorner.isPointerBlocker = false;
			this.topLeftCorner.thickness = 0;
			this.topLeftCorner.isEnabled = this._enabled;
			this.topLeftCorner.onPointerEnterObservable.add((eventData, eventState) => {
				_this._disableEdgeScroll();
				_this._topEdgeScroll = true;
				_this._leftEdgeScroll = true;
				if (_this.camera.metadata.movedBy === null ) {
					_this.camera.metadata.movedBy = ECameraMovement.MOUSE;
				}
			});
			this.topLeftCorner.onPointerOutObservable.add((eventData, eventState) => {
				_this._disableEdgeScroll();
			});
			gui.addControl(this.topLeftCorner);
		};

		FreeCameraMouseInput.prototype.onContextMenu = function (evt) {
			evt.preventDefault();
		};

		FreeCameraMouseInput.prototype.checkInputs = function () {
			if (this._enabled) {
				const speed = this.camera.speed;
				const mdata = this.camera.metadata;

				// if mouse is in an area, move the camera in that direction
				if(this._topEdgeScroll)    mdata.targetPosition.addInPlace(BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, speed), BABYLON.Matrix.RotationY(camera.rotation.y)));
				if(this._bottomEdgeScroll) mdata.targetPosition.addInPlace(BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, -speed), BABYLON.Matrix.RotationY(camera.rotation.y)));
				if(this._leftEdgeScroll)   mdata.targetPosition.addInPlace(BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-speed, 0, 0), BABYLON.Matrix.RotationY(camera.rotation.y)));
				if(this._rightEdgeScroll)  mdata.targetPosition.addInPlace(BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(speed, 0, 0), BABYLON.Matrix.RotationY(camera.rotation.y)));

				// if limit x/z is reached, set position to max/min value
				if (mdata.targetPosition.x < mdata.minX) mdata.targetPosition.x = mdata.minX;
				if (mdata.targetPosition.x > mdata.maxX) mdata.targetPosition.x = mdata.maxX;
				if (mdata.targetPosition.z < mdata.minZ) mdata.targetPosition.z = mdata.minZ;
				if (mdata.targetPosition.z > mdata.maxZ) mdata.targetPosition.z = mdata.maxZ;

				// calculate distance between actual camera position and targeted camera position
				var lengthDiff = (mdata.targetPosition.subtract(camera.position)).length();
				// movedBy prevent moving camera by keys and mouse simultaneously
				if (lengthDiff > 0 && mdata.movedBy === ECameraMovement.MOUSE) {
					var t = lengthDiff < 0.01 ? 1.0 : 0.02;
					camera.position = BABYLON.Vector3.Lerp(camera.position, mdata.targetPosition, t);
					if (t === 1.0) {
						mdata.movedBy = null;
					}
				}
			}
		}

		FreeCameraMouseInput.prototype.detachControl = function (ignored) {
			if (this.onContextMenu) {
				var engine = this.camera.getEngine();
				var element = engine.getInputElement();
				element && element.removeEventListener("contextmenu", this.onContextMenu);
			}
			gui.remove(this.topEdge);
			gui.remove(this.topRightCorner);
			gui.remove(this.rightEdge);
			gui.remove(this.bottomRightCorner);
			gui.remove(this.bottomEdge);
			gui.remove(this.bottomLeftCorner);
			gui.remove(this.leftEdge);
			gui.remove(this.topLeftCorner);

		};

		FreeCameraMouseInput.prototype.getClassName = function () {
			return "FreeCameraMouseInput";
		};

		FreeCameraMouseInput.prototype.getSimpleName = function () {
			return "mouse";
		};

		camera.inputs.add(new FreeCameraMouseInput());



		/**
		 * ========================================
		 * = Moving & rotating camera with keyboard
		 * ========================================
		 */ 
		var FreeCameraKeyboardInput = function () {
			this._keys = [];
			this.keysUp = [38, 87]; // arrowUp, w
			this.keysDown = [40, 83]; // arrowDown, s
			this.keysLeft = [37, 65]; // arrowLeft, a
			this.keysRight = [39, 68]; // arrowRight, d
			this.rotateKeysLeft = [81]; // q
			this.rotateKeysRight = [69]; // e
		}
		

		FreeCameraKeyboardInput.prototype.attachControl = function (noPreventDefault) {
			var _this = this;
			var engine = this.camera.getEngine();
			var element = engine.getInputElement();
			if (!this._onKeyDown) {
				element.tabIndex = 1;

				this._onKeyDown = function (evt) {                 
					if ((_this.keysUp.indexOf(evt.keyCode) !== -1 ||
						_this.keysDown.indexOf(evt.keyCode) !== -1 ||
						_this.keysLeft.indexOf(evt.keyCode) !== -1 ||
						_this.rotateKeysLeft.indexOf(evt.keyCode) !== -1 ||
						_this.rotateKeysRight.indexOf(evt.keyCode) !== -1 ||
						_this.keysRight.indexOf(evt.keyCode) !== -1)) {
						var index = _this._keys.indexOf(evt.keyCode);
						if (index === -1) {
							_this._keys.push(evt.keyCode);
						}
						if (!noPreventDefault) {
							evt.preventDefault();
						}
						if (_this.camera.metadata.movedBy === null) {
							_this.camera.metadata.movedBy = ECameraMovement.KEYS;
						}
					}
				};
				this._onKeyUp = function (evt) {
					if (_this.keysUp.indexOf(evt.keyCode) !== -1 ||
						_this.keysDown.indexOf(evt.keyCode) !== -1 ||
						_this.keysLeft.indexOf(evt.keyCode) !== -1 ||
						_this.rotateKeysLeft.indexOf(evt.keyCode) !== -1 ||
						_this.rotateKeysRight.indexOf(evt.keyCode) !== -1 ||
						_this.keysRight.indexOf(evt.keyCode) !== -1) {
						var index = _this._keys.indexOf(evt.keyCode);
						if (index >= 0) {
							_this._keys.splice(index, 1);
						}
						if (!noPreventDefault) {
							evt.preventDefault();
						}
					}
				};
				element.addEventListener("keydown", this._onKeyDown, false);
				element.addEventListener("keyup", this._onKeyUp, false);
			}
		};

		FreeCameraKeyboardInput.prototype.detachControl = function () {
			var engine = this.camera.getEngine();
			var element = engine.getInputElement();
			if (this._onKeyDown) {
				element.removeEventListener("keydown", this._onKeyDown);
				element.removeEventListener("keyup", this._onKeyUp);
				BABYLON.Tools.UnregisterTopRootEvents([
					{ name: "blur", handler: this._onLostFocus }
				]);
				this._keys = [];
				this._onKeyDown = null;
				this._onKeyUp = null;
			}
		};

		FreeCameraKeyboardInput.prototype.checkInputs = function () {
			if (this._onKeyDown) {
				var camera = this.camera;
				var speed = camera.speed;               
				var mdata = camera.metadata;
				// move camera for all pressed keys
				for (var index = 0; index < this._keys.length; index++) {
					var keyCode = this._keys[index];
					// move target camera position depending of pressed key
					if (this.keysLeft.indexOf(keyCode) !== -1) {
						mdata.targetPosition.addInPlace(BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(-speed, 0, 0), BABYLON.Matrix.RotationY(camera.rotation.y)));
					}
					else if (this.keysUp.indexOf(keyCode) !== -1) {
						mdata.targetPosition.addInPlace(BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, speed), BABYLON.Matrix.RotationY(camera.rotation.y)));
					}
					else if (this.keysRight.indexOf(keyCode) !== -1) {
						mdata.targetPosition.addInPlace(BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(speed, 0, 0), BABYLON.Matrix.RotationY(camera.rotation.y)));
					}
					else if (this.keysDown.indexOf(keyCode) !== -1) {
						mdata.targetPosition.addInPlace(BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(0, 0, -speed), BABYLON.Matrix.RotationY(camera.rotation.y)));
					} 
					// rotating is bit different. While moving the camera is done by lerp, 
					// rotating calculates the new position, set the target and sets the target camera position
					// to the actual camera position. Camera rotation is done by setTarget.
					else if (this.rotateKeysLeft.indexOf(keyCode) !== -1) {
						mdata.rotation += mdata.rotationSpeed;
						const tx = camera.target.x;
						const tz = camera.target.z; 
						const x = tx + mdata.radius * Math.sin(mdata.rotation);
						const z = tz + mdata.radius * Math.cos(mdata.rotation);
						camera.position = new BABYLON.Vector3(x, camera.position.y, z);
						camera.setTarget(new BABYLON.Vector3(tx, 0, tz));
						mdata.targetPosition = new BABYLON.Vector3(camera.position.x, camera.position.y, camera.position.z);
					}
					else if (this.rotateKeysRight.indexOf(keyCode) !== -1) {
						mdata.rotation -= mdata.rotationSpeed;
						const tx = camera.target.x;
						const tz = camera.target.z; 
						const x = tx + mdata.radius * Math.sin(mdata.rotation);
						const z = tz + mdata.radius * Math.cos(mdata.rotation);
						camera.position = new BABYLON.Vector3(x, camera.position.y, z);
						camera.setTarget(new BABYLON.Vector3(tx, 0, tz));
						mdata.targetPosition = new BABYLON.Vector3(camera.position.x, camera.position.y, camera.position.z);
					}
				}

				// x/z limit check
				if (mdata.targetPosition.x < mdata.minX) mdata.targetPosition.x = mdata.minX;
				if (mdata.targetPosition.x > mdata.maxX) mdata.targetPosition.x = mdata.maxX;
				if (mdata.targetPosition.z < mdata.minZ) mdata.targetPosition.z = mdata.minZ;
				if (mdata.targetPosition.z > mdata.maxZ) mdata.targetPosition.z = mdata.maxZ;

				// distance check
				var lengthDiff = (mdata.targetPosition.subtract(camera.position)).length();

				// moving
				if (lengthDiff > 0 && mdata.movedBy === ECameraMovement.KEYS) {
					var t = lengthDiff < 0.01 ? 1.0 : 0.02;
					camera.position = BABYLON.Vector3.Lerp(camera.position, mdata.targetPosition, t);
					if (t === 1.0) {
						mdata.movedBy = null;
					}
				} 
			}
		};

		//Add the onLostFocus function
		FreeCameraKeyboardInput.prototype._onLostFocus = function (e) {
			this._keys = [];
			disableEdgeScroll();
		};
		
		//Add the two required functions for the control Name
		FreeCameraKeyboardInput.prototype.getClassName = function () {
			return "FreeCameraKeyboardWalkInput";
		};

		FreeCameraKeyboardInput.prototype.getSimpleName = function () {
			return "keyboard";
		};

		camera.inputs.add(new FreeCameraKeyboardInput());

		/**
		 * ========================================
		 * = Zooming with mouse wheel
		 * ========================================
		 */ 
		var FreeCameraMouseWheelInput = function () {
			this._wheelDeltaY = 0;
		}

		//Add attachment controls
		FreeCameraMouseWheelInput.prototype.attachControl = function (noPreventDefault) {
			var _this = this;
			noPreventDefault = BABYLON.Tools.BackCompatCameraNoPreventDefault(arguments);
			this._wheel = function (pointer) {
				// sanity check - this should be a PointerWheel event.
				if (pointer.type !== BABYLON.PointerEventTypes.POINTERWHEEL) {
					return;
				}
				var event = pointer.event;
				if (event.deltaY !== undefined) {
					_this._wheelDeltaY -= event.deltaY;
				}
				if (event.preventDefault) {
					if (!noPreventDefault) {
						event.preventDefault();
					}
				}
			};
			this._observer = this.camera.getScene().onPointerObservable.add(this._wheel, BABYLON.PointerEventTypes.POINTERWHEEL);
		};

		FreeCameraMouseWheelInput.prototype.detachControl = function () {
			if (this._observer) {
				this.camera.getScene().onPointerObservable.remove(this._observer);
				this._observer = null;
				this._wheel = null;
			}
		};

		FreeCameraMouseWheelInput.prototype.checkInputs = function () {
			if (this._wheel) {
				const mdata = this.camera.metadata;
				// if mouse wheel was used, set target zoom
				if (this._wheelDeltaY < 0) {
					mdata.targetZoom += mdata.zoomSteps;
				} 
				else if(this._wheelDeltaY > 0) {
					mdata.targetZoom -= mdata.zoomSteps;
				}
				this._wheelDeltaY = 0;

				// check max/min zoom
				if (mdata.targetZoom > mdata.maxZoom) mdata.targetZoom = mdata.maxZoom;
				if (mdata.targetZoom < mdata.minZoom) mdata.targetZoom = mdata.minZoom;

				const diff = this.camera.fov - mdata.targetZoom;
				if (Math.abs(diff) < mdata.zoom) this.camera.fov = mdata.targetZoom;

				// add/subtract value from camera fov, until targetZoom is reached
				if (this.camera.fov < mdata.targetZoom) {
					this.camera.fov += mdata.zoom;
				} 
				else if (this.camera.fov > mdata.targetZoom) {
					this.camera.fov -= mdata.zoom;
				}
			}
		}
		
		FreeCameraMouseWheelInput.prototype.getClassName = function () {
			return "FreeCameraMouseWheelInput";
		};

		FreeCameraMouseWheelInput.prototype.getSimpleName = function () {
			return "mouseWheel";
		};
		camera.inputs.add(new FreeCameraMouseWheelInput());
		
		this.camera = camera;
		this.gui = gui;
	}
}
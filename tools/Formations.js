class Formations {
    static circularGrouping(unformateds, center, height = common.GROUND_Y_SCALE) {
        if (unformateds.length > 1) {
            const positions = [];

            for (let i = 0; i < unformateds.length; i++) {
                let angleDeg = i * (360 / unformateds.length)
                let angleRad = (angleDeg / 360) * 2 * Math.PI
                let customVector = new BABYLON.Vector3(-Math.cos(angleRad) * unformateds[i].mass,
                height * unformateds[i].subsidence, -Math.sin(angleRad) * unformateds[i].mass)
                positions.push(center.add(customVector))
            }

            return positions;
        }
        else {
            return [center];
        }
    }

    static getCentroid(units) {
        let totalMass = 0
        let totalX = 0
        let totalZ = 0
        units.forEach(unit => {
            totalMass += unit.mass
            totalX += unit.root.position.x * unit.mass
            totalZ += unit.root.position.z * unit.mass
        })

        return new BABYLON.Vector3(totalX / totalMass, 0, totalZ / totalMass);
    }

    static Direction2D(from, to) {
        return new BABYLON.Vector3(to.x - from.x, 0, to.z - from.z);
    }

    static Distance2D(from, to) {
        return Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.z - from.z, 2));
    }
}
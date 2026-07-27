package com.aditya.dronemonitoring.specification;

import com.aditya.dronemonitoring.entity.DroneTelemetry;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;

public class DroneTelemetrySpecification {

    private DroneTelemetrySpecification() {
    }

    public static Specification<DroneTelemetry>
    hasDroneId(Long droneId) {

        return (root, query, cb) ->

                droneId == null

                        ? null

                        : cb.equal(
                                root.get("drone").get("id"),
                                droneId);
    }

    public static Specification<DroneTelemetry> batteryBetween(
        Integer minBattery,
        Integer maxBattery) {

    return (root, query, cb) -> {

        if (minBattery == null && maxBattery == null) {
            return null;
        }

        if (minBattery != null && maxBattery != null) {
            return cb.between(
                    root.get("batteryLevel"),
                    minBattery,
                    maxBattery);
        }

        if (minBattery != null) {
            return cb.greaterThanOrEqualTo(
                    root.get("batteryLevel"),
                    minBattery);
        }

        return cb.lessThanOrEqualTo(
                root.get("batteryLevel"),
                maxBattery);
    };
}

    public static Specification<DroneTelemetry> speedBetween(
        Double minSpeed,
        Double maxSpeed) {

    return (root, query, cb) -> {

        if (minSpeed == null && maxSpeed == null) {
            return null;
        }

        if (minSpeed != null && maxSpeed != null) {
            return cb.between(
                    root.get("speed"),
                    minSpeed,
                    maxSpeed);
        }

        if (minSpeed != null) {
            return cb.greaterThanOrEqualTo(
                    root.get("speed"),
                    minSpeed);
        }

        return cb.lessThanOrEqualTo(
                root.get("speed"),
                maxSpeed);
    };
}

public static Specification<DroneTelemetry> altitudeBetween(
        Double minAltitude,
        Double maxAltitude) {

    return (root, query, cb) -> {

        if (minAltitude == null && maxAltitude == null) {
            return null;
        }

        if (minAltitude != null && maxAltitude != null) {
            return cb.between(
                    root.get("altitude"),
                    minAltitude,
                    maxAltitude);
        }

        if (minAltitude != null) {
            return cb.greaterThanOrEqualTo(
                    root.get("altitude"),
                    minAltitude);
        }

        return cb.lessThanOrEqualTo(
                root.get("altitude"),
                maxAltitude);
    };
}

public static Specification<DroneTelemetry> signalStrengthGreaterThan(
        Integer signalStrength) {

    return (root, query, cb) ->

            signalStrength == null
                    ? null
                    : cb.greaterThanOrEqualTo(
                            root.get("signalStrength"),
                            signalStrength);
}


    public static Specification<DroneTelemetry> timestampBetween(
        LocalDateTime startTime,
        LocalDateTime endTime) {

    return (root, query, cb) -> {

        if (startTime == null && endTime == null) {
            return null;
        }

        if (startTime != null && endTime != null) {
            return cb.between(
                    root.get("timestamp"),
                    startTime,
                    endTime);
        }

        if (startTime != null) {
            return cb.greaterThanOrEqualTo(
                    root.get("timestamp"),
                    startTime);
        }

        return cb.lessThanOrEqualTo(
                root.get("timestamp"),
                endTime);
    };
}
}
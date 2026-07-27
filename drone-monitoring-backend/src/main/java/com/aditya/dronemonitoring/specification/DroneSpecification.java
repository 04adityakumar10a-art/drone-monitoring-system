package com.aditya.dronemonitoring.specification;

import com.aditya.dronemonitoring.entity.Drone;
import com.aditya.dronemonitoring.entity.DroneStatus;
import org.springframework.data.jpa.domain.Specification;

public final class DroneSpecification {

    private DroneSpecification() {}

    public static Specification<Drone> hasStatus(DroneStatus status) {

        return (root, query, cb) ->
                cb.equal(root.get("status"), status);
    }

    public static Specification<Drone> hasManufacturer(String manufacturer) {

        return (root, query, cb) ->
                cb.equal(root.get("manufacturer"), manufacturer);
    }

    public static Specification<Drone> batteryLessThan(Integer battery) {

        return (root, query, cb) ->
                cb.lessThan(root.get("batteryLevel"), battery);
    }
}
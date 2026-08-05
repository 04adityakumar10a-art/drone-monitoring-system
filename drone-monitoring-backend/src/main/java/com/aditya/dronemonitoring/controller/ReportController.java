package com.aditya.dronemonitoring.controller;

import com.aditya.dronemonitoring.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/fleet/csv")
    public ResponseEntity<ByteArrayResource> fleetCsv() {

        return build(

                reportService.exportFleetCsv(),

                "fleet_report.csv",

                "text/csv"

        );

    }

    @GetMapping("/fleet/excel")
    public ResponseEntity<ByteArrayResource> fleetExcel() {

        return build(

                reportService.exportFleetExcel(),

                "fleet_report.xlsx",

                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

        );

    }

    @GetMapping("/fleet/pdf")
    public ResponseEntity<ByteArrayResource> fleetPdf() {

        return build(

                reportService.exportFleetPdf(),

                "fleet_report.pdf",

                "application/pdf"

        );

    }

    @GetMapping("/drone/{id}/csv")
    public ResponseEntity<ByteArrayResource> droneCsv(
            @PathVariable Long id) {

        return build(

                reportService.exportDroneCsv(id),

                "drone_" + id + ".csv",

                "text/csv"

        );

    }

    @GetMapping("/drone/{id}/excel")
    public ResponseEntity<ByteArrayResource> droneExcel(
            @PathVariable Long id) {

        return build(

                reportService.exportDroneExcel(id),

                "drone_" + id + ".xlsx",

                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

        );

    }

    @GetMapping("/drone/{id}/pdf")
    public ResponseEntity<ByteArrayResource> dronePdf(
            @PathVariable Long id) {

        return build(

                reportService.exportDronePdf(id),

                "drone_" + id + ".pdf",

                "application/pdf"

        );

    }

    private ResponseEntity<ByteArrayResource> build(

            byte[] data,

            String filename,

            String type

    ) {

        ByteArrayResource resource = new ByteArrayResource(data);

        return ResponseEntity.ok()

                .header(

                        HttpHeaders.CONTENT_DISPOSITION,

                        "attachment; filename=" + filename

                )

                .contentType(MediaType.parseMediaType(type))

                .contentLength(data.length)

                .body(resource);

    }

}
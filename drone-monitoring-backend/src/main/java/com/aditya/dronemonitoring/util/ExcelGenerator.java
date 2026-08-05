package com.aditya.dronemonitoring.util;

import com.aditya.dronemonitoring.entity.Drone;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayOutputStream;
import java.util.List;

public class ExcelGenerator {

    private ExcelGenerator() {
    }

    public static byte[] generateFleetExcel(List<Drone> drones) {

        try (Workbook workbook = new XSSFWorkbook()) {

            Sheet sheet = workbook.createSheet("Fleet Report");

            Font headerFont = workbook.createFont();
            headerFont.setBold(true);

            CellStyle headerStyle = workbook.createCellStyle();
            headerStyle.setFont(headerFont);

            String[] headers = {
                    "ID",
                    "Serial Number",
                    "Model",
                    "Manufacturer",
                    "Battery",
                    "Status",
                    "Latitude",
                    "Longitude",
                    "Altitude",
                    "Last Seen"
            };

            Row headerRow = sheet.createRow(0);

            for (int i = 0; i < headers.length; i++) {

                Cell cell = headerRow.createCell(i);

                cell.setCellValue(headers[i]);

                cell.setCellStyle(headerStyle);

            }

            int rowNum = 1;

            for (Drone drone : drones) {

                Row row = sheet.createRow(rowNum++);

                row.createCell(0).setCellValue(drone.getId());

                row.createCell(1).setCellValue(drone.getSerialNumber());

                row.createCell(2).setCellValue(drone.getModel());

                row.createCell(3).setCellValue(drone.getManufacturer());

                row.createCell(4).setCellValue(drone.getBatteryLevel());

                row.createCell(5).setCellValue(drone.getStatus().name());

                if (drone.getLatitude() != null) {

                    row.createCell(6).setCellValue(drone.getLatitude());

                } else {

                    row.createCell(6).setCellValue("");

                }

                if (drone.getLongitude() != null) {

                    row.createCell(7).setCellValue(drone.getLongitude());

                } else {

                    row.createCell(7).setCellValue("");

                }
                if (drone.getAltitude() != null) {

                    row.createCell(8).setCellValue(drone.getAltitude());

                } else {

                    row.createCell(8).setCellValue("");

                }

                row.createCell(9).setCellValue(

                        drone.getLastSeen() == null

                                ? ""

                                : drone.getLastSeen().toString()

                );

            }

            for (int i = 0; i < headers.length; i++) {

                sheet.autoSizeColumn(i);

            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();

            workbook.write(out);

            return out.toByteArray();

        }

        catch (Exception e) {

            throw new RuntimeException(e);

        }

    }

}
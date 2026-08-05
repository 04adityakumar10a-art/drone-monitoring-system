package com.aditya.dronemonitoring.util;

import com.aditya.dronemonitoring.entity.Drone;
import com.lowagie.text.*;
import com.lowagie.text.pdf.*;

import java.io.ByteArrayOutputStream;
import java.util.List;

public class PdfGenerator {

    private PdfGenerator() {
    }

    public static byte[] generateFleetPdf(List<Drone> drones) {

        try {

            Document document = new Document(PageSize.A4.rotate());

            ByteArrayOutputStream out = new ByteArrayOutputStream();

            PdfWriter.getInstance(document, out);

            document.open();

            Font titleFont = new Font(Font.HELVETICA, 18, Font.BOLD);

            Paragraph title = new Paragraph("Fleet Report", titleFont);

            title.setAlignment(Element.ALIGN_CENTER);

            document.add(title);

            document.add(new Paragraph(" "));

            PdfPTable table = new PdfPTable(10);

            table.setWidthPercentage(100);

            String[] headers = {

                    "ID",

                    "Serial",

                    "Model",

                    "Manufacturer",

                    "Battery",

                    "Status",

                    "Latitude",

                    "Longitude",

                    "Altitude",

                    "Last Seen"

            };

            for (String h : headers) {

                PdfPCell cell = new PdfPCell(new Phrase(h));

                cell.setHorizontalAlignment(Element.ALIGN_CENTER);

                table.addCell(cell);

            }

            for (Drone drone : drones) {

                table.addCell(String.valueOf(drone.getId()));

                table.addCell(drone.getSerialNumber());

                table.addCell(drone.getModel());

                table.addCell(drone.getManufacturer());

                table.addCell(String.valueOf(drone.getBatteryLevel()));

                table.addCell(drone.getStatus().name());

                table.addCell(String.valueOf(drone.getLatitude()));

                table.addCell(String.valueOf(drone.getLongitude()));

                table.addCell(String.valueOf(drone.getAltitude()));

                table.addCell(
                        drone.getLastSeen() == null
                                ? ""
                                : drone.getLastSeen().toString()
                );

            }

            document.add(table);

            document.close();

            return out.toByteArray();

        }

        catch (Exception e) {

            throw new RuntimeException(e);

        }

    }

}
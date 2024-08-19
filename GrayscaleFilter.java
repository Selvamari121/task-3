package com.imageprocessing.imageprocessing.filters;

import com.imageprocessing.imageprocessing.exceptions.FilterException;
import java.awt.image.BufferedImage;
import java.awt.Color;

public class GrayscaleFilter extends ImageFilter {
    @Override
    public BufferedImage applyFilter(BufferedImage img) throws FilterException {
        if (img == null) {
            throw new FilterException("Image is null");
        }

        BufferedImage result = new BufferedImage(img.getWidth(), img.getHeight(), BufferedImage.TYPE_BYTE_GRAY);

        for (int x = 0; x < img.getWidth(); x++) {
            for (int y = 0; y < img.getHeight(); y++) {
                Color color = new Color(img.getRGB(x, y));
                int gray = (color.getRed() + color.getGreen() + color.getBlue()) / 3;
                result.setRGB(x, y, new Color(gray, gray, gray).getRGB());
            }
        }

        return result;
    }

    @Override
    public String getDescription() {
        return "Grayscale Filter";
    }
}



    // @Override
    // public BufferedImage applyFilter(BufferedImage img) throws FilterException {
    //     if (img == null) throw new FilterException("Image is null");
    //     BufferedImage result = new BufferedImage(img.getWidth(), img.getHeight(), img.getType());
    //     for (int x = 0; x < img.getWidth(); x++) {
    //         for (int y = 0; y < img.getHeight(); y++) {
    //             Color color = new Color(img.getRGB(x, y));
    //             int gray = (color.getRed() + color.getGreen() + color.getBlue()) / 3;
    //             result.setRGB(x, y, new Color(gray, gray, gray).getRGB());
    //         }
    //     }
    //     return result;
    // }

    // @Override
    // public String getDescription() {
    //     return "Grayscale Filter";
    // }
// }

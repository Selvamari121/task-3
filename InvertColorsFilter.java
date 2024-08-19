package com.imageprocessing.imageprocessing.filters;

import com.imageprocessing.imageprocessing.exceptions.FilterException;
import java.awt.Color;
import java.awt.image.BufferedImage;

public class InvertColorsFilter extends ImageFilter {
    @Override
    public BufferedImage applyFilter(BufferedImage img) throws FilterException {
        if (img == null) {
            throw new FilterException("Image is null");
        }

        BufferedImage result = new BufferedImage(img.getWidth(), img.getHeight(), img.getType());
        for (int y = 0; y < img.getHeight(); y++) {
            for (int x = 0; x < img.getWidth(); x++) {
                Color color = new Color(img.getRGB(x, y));
                Color invertedColor = new Color(255 - color.getRed(), 255 - color.getGreen(), 255 - color.getBlue());
                result.setRGB(x, y, invertedColor.getRGB());
            }
        }
        return result;
    }

}

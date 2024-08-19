package com.imageprocessing.imageprocessing.filters;

import com.imageprocessing.imageprocessing.exceptions.FilterException;
import java.awt.image.BufferedImage;

public class EdgeDetectionFilter extends ImageFilter {

    @Override
    public BufferedImage applyFilter(BufferedImage img) throws FilterException {
        if (img == null) {
            throw new FilterException("Image is null");
        }

        int width = img.getWidth();
        int height = img.getHeight();
        BufferedImage result = new BufferedImage(width, height, BufferedImage.TYPE_BYTE_GRAY);

        int[][] sobelX = {
            {-1, 0, 1},
            {-2, 0, 2},
            {-1, 0, 1}
        };
        int[][] sobelY = {
            {-1, -2, -1},
            {0, 0, 0},
            {1, 2, 1}
        };

        for (int y = 1; y < height - 1; y++) {
            for (int x = 1; x < width - 1; x++) {
                int gx = 0, gy = 0;

                for (int ky = 0; ky < 3; ky++) {
                    for (int kx = 0; kx < 3; kx++) {
                        int pixel = img.getRGB(x + kx - 1, y + ky - 1);
                        int gray = (pixel >> 16) & 0xFF;
                        gx += gray * sobelX[ky][kx];
                        gy += gray * sobelY[ky][kx];
                    }
                }

                int edgeMagnitude = (int) Math.sqrt(gx * gx + gy * gy);
                edgeMagnitude = Math.min(255, Math.max(0, edgeMagnitude));

                int newPixel = (edgeMagnitude << 16) | (edgeMagnitude << 8) | edgeMagnitude;
                result.setRGB(x, y, newPixel);
            }
        }

        return result;
    }
}

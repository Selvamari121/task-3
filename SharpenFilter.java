package com.imageprocessing.imageprocessing.filters;

import com.imageprocessing.imageprocessing.exceptions.FilterException;
import java.awt.image.BufferedImage;

public class SharpenFilter extends ImageFilter{
    @Override
    public BufferedImage applyFilter(BufferedImage img) throws FilterException {
        if (img == null) {
            throw new FilterException("Image is null");
        }
        BufferedImage result = new BufferedImage(img.getWidth(), img.getHeight(), img.getType());
        float[] sharpenKernel = {
            0, -1, 0,
            -1, 5, -1,
            0, -1, 0
        };
        int kernelWidth = 3;

        for (int y = 1; y < img.getHeight() - 1; y++) {
            for (int x = 1; x < img.getWidth() - 1; x++) {
                int r = 0, g = 0, b = 0;

                for (int ky = 0; ky < kernelWidth; ky++) {
                    for (int kx = 0; kx < kernelWidth; kx++) {
                        int pixel = img.getRGB(x + kx - 1, y + ky - 1);
                        r += ((pixel >> 16) & 0xFF) * sharpenKernel[ky * kernelWidth + kx];
                        g += ((pixel >> 8) & 0xFF) * sharpenKernel[ky * kernelWidth + kx];
                        b += (pixel & 0xFF) * sharpenKernel[ky * kernelWidth + kx];
                    }
                }

                int newPixel = (Math.min(Math.max((int) r, 0), 255) << 16) | (Math.min(Math.max((int) g, 0), 255) << 8) | Math.min(Math.max((int) b, 0), 255);
                result.setRGB(x, y, newPixel);
            }
        }
        return result;
    }

}

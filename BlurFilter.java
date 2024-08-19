package com.imageprocessing.imageprocessing.filters;

import com.imageprocessing.imageprocessing.exceptions.FilterException;
import java.awt.image.BufferedImage;

public class BlurFilter  extends ImageFilter {
    @Override
    public BufferedImage applyFilter(BufferedImage img) throws FilterException {
        if (img == null) {
            throw new FilterException("Image is null");
        }
    
        BufferedImage result = new BufferedImage(img.getWidth(), img.getHeight(), img.getType());
        int[] blurKernel = {1, 1, 1, 1, 1, 1, 1, 1, 1};
        int kernelWidth = 3;
        int kernelSum = 9;
    
        for (int y = 0; y < img.getHeight(); y++) {
            for (int x = 0; x < img.getWidth(); x++) {
                int r = 0, g = 0, b = 0;
    
                for (int ky = 0; ky < kernelWidth; ky++) {
                    for (int kx = 0; kx < kernelWidth; kx++) {
                        int offsetX = x + kx - 1;
                        int offsetY = y + ky - 1;

                        if (offsetX >= 0 && offsetX < img.getWidth() && offsetY >= 0 && offsetY < img.getHeight()) {
                            int pixel = img.getRGB(offsetX, offsetY);
                            r += ((pixel >> 16) & 0xFF) * blurKernel[ky * kernelWidth + kx];
                            g += ((pixel >> 8) & 0xFF) * blurKernel[ky * kernelWidth + kx];
                            b += (pixel & 0xFF) * blurKernel[ky * kernelWidth + kx];
                        }
                    }
                }
    
                r /= kernelSum;
                g /= kernelSum;
                b /= kernelSum;
    
                int newPixel = (r << 16) | (g << 8) | b;
                result.setRGB(x, y, newPixel);
            }
        }
        return result;
    }

}

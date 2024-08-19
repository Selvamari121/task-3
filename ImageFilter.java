package com.imageprocessing.imageprocessing.filters;

import com.imageprocessing.imageprocessing.exceptions.FilterException;
import java.awt.image.BufferedImage;

public abstract class ImageFilter {
   public abstract BufferedImage applyFilter(BufferedImage img) throws FilterException;

   public String getDescription() {
      return "Generic image filter";
   }
    
}

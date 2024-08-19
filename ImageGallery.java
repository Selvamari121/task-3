package com.imageprocessing.imageprocessing.utils;

import com.imageprocessing.imageprocessing.exceptions.FilterException;
import com.imageprocessing.imageprocessing.filters.ImageFilter;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;

import org.springframework.stereotype.Component;

@Component
public class ImageGallery {
   private List<BufferedImage> images = new ArrayList<>();
   private List<ImageFilter> filters = new ArrayList<>();
   private List<BufferedImage> history = new ArrayList<>();
   private BufferedImage lastImage;
    
   public void addImage(BufferedImage img) {
      images.add(img);
      lastImage = img;
   }

   public void removeImage(BufferedImage img) {
      images.remove(img);
   }

   public void applyFilterToAll(ImageFilter filter) throws FilterException {
      history.clear();
      for (BufferedImage img : images) {
         BufferedImage result = filter.applyFilter(img);
         images.set(images.indexOf(img), result);
         history.add(result);
      }
   }

   public void addFilter(ImageFilter filter) {
      filters.add(filter);
   }

   public void removeFilter(ImageFilter filter) {
      filters.remove(filter);
   }

   public void applyBatchFilters(List<ImageFilter> filters) throws FilterException {
      history.clear();
      for (ImageFilter filter : filters) {
         applyFilterToAll(filter);
      }
   }

   public void undoLastFilter() throws FilterException {
      if (history.isEmpty()) {
         throw new FilterException("No filters to undo.");
     }
     images.clear();
     images.addAll(history);
     history.clear();
   }

   public List<BufferedImage> getImages() {
      return new ArrayList<>(images);
   }

   public List<ImageFilter> getFilters() {
      return new ArrayList<>(filters);
   }

   public BufferedImage getLastImage() {
      if (images.isEmpty()) {
         throw new IllegalStateException("No images in the gallery.");
     }
     return images.get(images.size() - 1);
   }
   public String saveLastImage(String format, String path) throws IOException {
      File file = new File(path);
      ImageIO.write(lastImage, format, file);
      return file.getAbsolutePath();
   }
}




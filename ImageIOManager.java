package com.imageprocessing.imageprocessing.io;

import com.imageprocessing.imageprocessing.exceptions.ImageIOException;
import javax.imageio.ImageIO;
import org.springframework.stereotype.Component;
import java.awt.image.BufferedImage;
import java.awt.image.RenderedImage;
import java.io.File;
import java.io.IOException;

@Component
public class ImageIOManager {

   public BufferedImage loadImage(String path) throws ImageIOException {
      try {
          return ImageIO.read(new File(path));
      } catch (IOException e) {
          throw new ImageIOException("Error loading image: " + e.getMessage());
      }
  }

  public void saveImage(BufferedImage img, String format, String path) throws ImageIOException {
      try {
          ImageIO.write((RenderedImage) img, format, new File(path));
      } catch (IOException e) {
          throw new ImageIOException("Error saving image: " + e.getMessage());
      }
  }

}


   // public BufferedImage loadImage(String path) throws ImageIOException {
   //    try {
   //       return ImageIO.read(new File(path));
   //    } catch (IOException e) {
   //       throw new ImageIOException("Error loading image from path: " + path, e);
   //    }
   // }

   // public void saveImage(BufferedImage img, String format, String outputPath) throws ImageIOException {
   //    try {
   //       File outputFile = new File(outputPath);
   //       if (!outputFile.getParentFile().exists()) {
   //          outputFile.getParentFile().mkdirs();
   //       }
   //       ImageIO.write(img, format, outputFile);
   //    } catch (IOException e) {
   //       throw new ImageIOException("Error saving image to path: " + outputPath, e);
   //    }
   // }





       //  public BufferedImage loadImage(String path) throws ImageIOException {
   //      try {
   //          return ImageIO.read(new File(path));
   //      } catch (IOException e) {
   //          throw new ImageIOException("Error loading image from path: " + path);
   //      }
   //  }
//     public BufferedImage loadImage(String path) throws ImageIOException {
//       try {
//           return ImageIO.read(new File(path));
//       } catch (IOException e) {
//           throw new ImageIOException("Failed to load image from " + path, e);
//       }
//   }

//   public void saveImage(BufferedImage image, String format, String path) throws ImageIOException {
//       try {
//           ImageIO.write(image, format, new File(path));
//       } catch (IOException e) {
//           throw new ImageIOException("Failed to save image to " + path, e);
//       }
//   }

   // public BufferedImage loadImage(String path){
   //    throws ImageIOException
   // }
   // public void saveImage(BufferedImage img, String format, String path){
   //    throws ImageIOException
   // }
   


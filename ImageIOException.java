package com.imageprocessing.imageprocessing.exceptions;

public class ImageIOException extends Exception {
   public ImageIOException(String message) {
      super(message);
   }

   public ImageIOException(String message, Throwable cause) {
      super(message, cause);
   }

}

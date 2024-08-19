package com.imageprocessing.imageprocessing.controller;

import com.imageprocessing.imageprocessing.filters.GrayscaleFilter;
import com.imageprocessing.imageprocessing.filters.ImageFilter;
import com.imageprocessing.imageprocessing.exceptions.FilterException;
import com.imageprocessing.imageprocessing.filters.BlurFilter;
import com.imageprocessing.imageprocessing.filters.InvertColorsFilter;
import com.imageprocessing.imageprocessing.filters.SharpenFilter;
import com.imageprocessing.imageprocessing.io.ImageIOManager;
import com.imageprocessing.imageprocessing.utils.ImageGallery;
import com.imageprocessing.imageprocessing.filters.EdgeDetectionFilter;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.imageio.ImageIO;

@RestController
@RequestMapping("/api/images")
public class ImageProcessingController {
    private final ImageGallery gallery = new ImageGallery();
    private final ImageIOManager ioManager = new ImageIOManager();
    private static final Map<String, ImageFilter> FILTER_REGISTRY = new HashMap<>();

    static {
        FILTER_REGISTRY.put("grayscale", new GrayscaleFilter());
        FILTER_REGISTRY.put("blur", new BlurFilter());
        FILTER_REGISTRY.put("invert", new InvertColorsFilter());
        FILTER_REGISTRY.put("sharpen", new SharpenFilter());
        FILTER_REGISTRY.put("edge-detection", new EdgeDetectionFilter());
    }

    @PostMapping("/upload")
    public Map<String, String> uploadImage(@RequestParam("file") MultipartFile file) {
        Map<String, String> response = new HashMap<>();
        try {
            BufferedImage img = ImageIO.read(file.getInputStream());
            gallery.addImage(img);
            response.put("message", "Image uploaded successfully");
        } catch (IOException e) {
            response.put("message", "Error uploading image: " + e.getMessage());
        }
        return response;
    }

    @PostMapping("/apply-filter")
    public Map<String, String> applyFilter(@RequestParam("filter") String filterName) {
        Map<String, String> response = new HashMap<>();
        ImageFilter filter = getFilterByName(filterName);
        if (filter == null) {
            response.put("message", "Filter not found.");
            return response;
        }
        try {
            gallery.applyFilterToAll(filter);
            response.put("message", "Filter applied successfully.");
        } catch (FilterException e) {
            response.put("message", "Error applying filter: " + e.getMessage());
        }
        return response;
    }

    @PostMapping("/batch-filter")
    public Map<String, String> applyBatchFilters(@RequestParam("filters") List<String> filterNames) {
    Map<String, String> response = new HashMap<>();
    List<ImageFilter> filters = getFiltersByNames(filterNames);
    
    if (filters.size() < filterNames.size()) {
        response.put("message", "Some filters were not found.");
    }
    
    try {
        gallery.applyBatchFilters(filters);
        response.put("message", "Batch filters applied successfully.");
    } catch (FilterException e) {
        response.put("message", "Error applying batch filters: " + e.getMessage());
    }
    return response;
}

    @PostMapping("/undo-filter")
    public Map<String, String> undoLastFilter() {
        Map<String, String> response = new HashMap<>();
        try {
            gallery.undoLastFilter();
            response.put("message", "Last filter undone successfully.");
        } catch (FilterException e) {
            response.put("message", "Error undoing last filter: " + e.getMessage());
        }
        return response;
    }

    @GetMapping("/download")
    public Map<String, String> downloadImage(@RequestParam("path") String path, @RequestParam("format") String format) {
        Map<String, String> response = new HashMap<>();
        try {
            BufferedImage img = gallery.getLastImage(); 
            if (img == null) {
                response.put("message", "No image found in gallery.");
                return response;
            }
            ioManager.saveImage(img, format, path);
            response.put("message", "Image saved successfully.");
        } catch (Exception e) {
            response.put("message", "Error saving image: " + e.getMessage());
        }
        return response;
    }

    private ImageFilter getFilterByName(String filterName) {
        return FILTER_REGISTRY.get(filterName.toLowerCase());
    }

    private List<ImageFilter> getFiltersByNames(List<String> filterNames) {
        return filterNames.stream().map(name -> FILTER_REGISTRY.get(name.toLowerCase())).filter(filter -> filter != null).toList();
    }
}

//     private final ImageGallery gallery = new ImageGallery();
//     private final ImageIOManager ioManager = new ImageIOManager();
//     private static final Map<String, ImageFilter> FILTER_REGISTRY = new HashMap<>();

//     static {
//         FILTER_REGISTRY.put("grayscale", new GrayscaleFilter());
//         FILTER_REGISTRY.put("blur", new BlurFilter());
//         FILTER_REGISTRY.put("invert", new InvertColorsFilter());
//         FILTER_REGISTRY.put("sharpen", new SharpenFilter());
//         FILTER_REGISTRY.put("edge-detection", new EdgeDetectionFilter());
//     }

//     @PostMapping("/upload")
//     public Map<String, String> uploadImage(@RequestParam("file") MultipartFile file) {
//         Map<String, String> response = new HashMap<>();
//         try {
//             BufferedImage img = ImageIO.read(file.getInputStream());
//             gallery.addImage(img);
//             response.put("message", "Image uploaded successfully");
//         } catch (IOException e) {
//             response.put("message", "Error uploading image: " + e.getMessage());
//         }
//         return response;
//     }

//     @PostMapping("/apply-filter")
//     public Map<String, String> applyFilter(@RequestParam("filter") String filterName) {
//         Map<String, String> response = new HashMap<>();
//         ImageFilter filter = getFilterByName(filterName);
//         if (filter == null) {
//             response.put("message", "Filter not found.");
//             return response;
//         }
//         try {
//             gallery.applyFilterToAll(filter);
//             response.put("message", "Filter applied successfully.");
//         } catch (FilterException e) {
//             response.put("message", "Error applying filter: " + e.getMessage());
//         }
//         return response;
//     }

//     @PostMapping("/batch-filter")
//     public Map<String, String> applyBatchFilters(@RequestParam("filters") List<String> filterNames) {
//         Map<String, String> response = new HashMap<>();
//         List<ImageFilter> filters = getFiltersByNames(filterNames);
//         try {
//             gallery.applyBatchFilters(filters);
//             response.put("message", "Batch filters applied successfully.");
//         } catch (FilterException e) {
//             response.put("message", "Error applying batch filters: " + e.getMessage());
//         }
//         return response;
//     }

//     @PostMapping("/undo-filter")
//     public Map<String, String> undoLastFilter() {
//         Map<String, String> response = new HashMap<>();
//         try {
//             gallery.undoLastFilter();
//             response.put("message", "Last filter undone successfully.");
//         } catch (FilterException e) {
//             response.put("message", "Error undoing last filter: " + e.getMessage());
//         }
//         return response;
//     }

//     @GetMapping("/download")
//     public Map<String, String> downloadImage(@RequestParam("path") String path, @RequestParam("format") String format) {
//         Map<String, String> response = new HashMap<>();
//         try {
//             BufferedImage img = (BufferedImage) gallery.getImages();
//             if (img == null) {
//                 response.put("message", "No image found in gallery.");
//                 return response;
//             }
//             ioManager.saveImage(img, format, path);
//             response.put("message", "Image saved successfully.");
//         } catch (Exception e) {
//             response.put("message", "Error saving image: " + e.getMessage());
//         }
//         return response;
//     }

//     private ImageFilter getFilterByName(String filterName) {
//         return FILTER_REGISTRY.get(filterName.toLowerCase());
//     }

//     private List<ImageFilter> getFiltersByNames(List<String> filterNames) {
//         return filterNames.stream().map(name -> FILTER_REGISTRY.get(name.toLowerCase())).filter(filter -> filter != null).toList();
//     }
// }




// import java.awt.image.BufferedImage;
// import java.io.ByteArrayOutputStream;
// import java.io.IOException;

// import javax.imageio.ImageIO;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.multipart.MultipartFile;
// import com.imageprocessing.imageprocessing.exceptions.FilterException;
// import com.imageprocessing.imageprocessing.filters.BlurFilter;
// import com.imageprocessing.imageprocessing.filters.EdgeDetectionFilter;
// import com.imageprocessing.imageprocessing.filters.GrayscaleFilter;
// import com.imageprocessing.imageprocessing.filters.ImageFilter;
// import com.imageprocessing.imageprocessing.filters.InvertColorsFilter;
// import com.imageprocessing.imageprocessing.filters.SharpenFilter;

// import jakarta.servlet.http.HttpServletResponse;

// @RestController
// @RequestMapping("/api/filters")
// public class ImageController {
   
//    @RequestMapping(value = "/")
//    public void redirect(HttpServletResponse response) throws IOException {
//       response.sendRedirect("http://localhost:3000/");
//    }
//    @PostMapping("/apply")
//    public ResponseEntity<byte[]> applyFilter(@RequestParam String filterType,@RequestParam("file") MultipartFile file) {
//       try {
//          BufferedImage image = ImageIO.read(file.getInputStream());
//          BufferedImage result = applySelectedFilter(filterType, image);

//          ByteArrayOutputStream baos = new ByteArrayOutputStream();
//          ImageIO.write(result, "jpg", baos);
//          byte[] imageBytes = baos.toByteArray();

//          return ResponseEntity.ok().body(imageBytes);
//       } catch (Exception e) {
//          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//       }
//    }

//    private BufferedImage applySelectedFilter(String filterType, BufferedImage img) throws FilterException {
//       ImageFilter filter;
//       switch (filterType) {
//       case "grayscale":
//          filter = new GrayscaleFilter();
//          break;
//       case "blur":
//          filter = new BlurFilter();
//          break;
//       case "invert":
//          filter = new InvertColorsFilter();
//          break;
//       case "sharpen":
//          filter = new SharpenFilter();
//          break;
//       case "edge":
//          filter = new EdgeDetectionFilter();
//          break;
//       default:
//          throw new IllegalArgumentException("Unknown filter type: " + filterType);
//       }
//        return filter.applyFilter(img);
//    }
// }

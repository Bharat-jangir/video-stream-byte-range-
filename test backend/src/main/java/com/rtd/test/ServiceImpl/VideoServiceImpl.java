package com.rtd.test.ServiceImpl;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.CopyOption;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import javax.management.RuntimeErrorException;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.rtd.test.Services.VideoService;
import com.rtd.test.entities.Video;
import com.rtd.test.repositories.VideoRepository;

import jakarta.annotation.PostConstruct;

@Service
public class VideoServiceImpl implements VideoService {

    private final VideoRepository videoRepository;

    public VideoServiceImpl(VideoRepository repository) {
        this.videoRepository = repository;
    }

    @Value("${files.video}")
    String DIR;

    @PostConstruct
    public void init() {
        File file = new File(DIR);

        if (!file.exists()) {
            file.mkdir();
            System.out.println("folder created");
        } else {
            System.out.println("folder already created");
        }
    }

    @Override
    public Video save(Video video, MultipartFile file) {
        try {
            String filename = file.getOriginalFilename();
            String contentype = file.getContentType();
            InputStream inputStream = file.getInputStream();

            String cleanFileName = StringUtils.cleanPath(filename);
            String cleanFolder = StringUtils.cleanPath(DIR);

            Path path = Paths.get(cleanFolder, cleanFileName);

            System.out.println(path);
            System.out.println(contentype);

            Files.copy(inputStream, path, StandardCopyOption.REPLACE_EXISTING);

            video.setContentType(contentype);
            video.setFilePath(path.toString());

            return videoRepository.save(video);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }

        // folder path:create
    }

    @Override
    public Video getByTitle(String title) {
        Video video = videoRepository.findByTitle(title).orElseThrow(() -> new RuntimeException("Video Not Found"));
        return video;

    }

    @Override
    public Video get(String videoId) {
        Video video = videoRepository.findById(videoId).orElseThrow(() -> new RuntimeException("Video Not Found"));
        return video;
    }

    @Override
    public List<Video> getAll() {
        List<Video> list = videoRepository.findAll();
        return list;

    }

    @Override
    public String deleteAll() {

        try {
            Path path=Paths.get(DIR);
            File file = new File(path.toString()); 
            FileUtils.cleanDirectory(file);
            videoRepository.deleteAll();
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "all videos got deleted successfully";
        

    }

}

package com.rtd.test.Services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.rtd.test.entities.Video;

public interface VideoService {

    //save video

    Video save(Video video,MultipartFile file);

    //get video by title
    Video getByTitle(String title);

    //get video by id
    Video get(String videoId);

    //get all videos
    List<Video> getAll();

    //delete all videos
    String deleteAll();
}

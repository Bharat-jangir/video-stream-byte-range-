package com.rtd.test.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Course {

    @Id
    private String id;
    private String title;

    // @OneToMany(mappedBy = "course")
    // private List<Video> list=new ArrayList<>();
}

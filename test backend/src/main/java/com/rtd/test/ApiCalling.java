package com.rtd.test;

import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class ApiCalling {

    @Bean
    public RestTemplate axios(){
        return new RestTemplate();
    }

    @RequestMapping("/hello")
    public String sayHello(){
        return "hello ";
    }

    @GetMapping("/joke")
    public String getJoke(){
        String uri="https://ipinfo.io/161.185.160.93/geo";
        String joke=axios().getForObject(uri, String.class);
        return joke;
    }
}

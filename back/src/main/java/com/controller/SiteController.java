package com.controller;

import com.model.Site;
import com.repository.SiteRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/sites")
@CrossOrigin(origins = "http://localhost:3000")
public class SiteController {
    private final SiteRepository siteRepository;

    public SiteController(SiteRepository siteRepository) {
        this.siteRepository = siteRepository;
    }

    @PostMapping("/add")
    public String addSite(@RequestBody Map<String, String> request) {
        //입력한 url 을 받아오기
        String url = request.get("url");
        System.out.println("Entered url info: " + url);
        //모델 데이터 저장하기
        Site site = new Site();
        site.setUrl(url);
        siteRepository.save(site);
        //감시(?) 시작하기

        return "Site added: " + url;
    }
}

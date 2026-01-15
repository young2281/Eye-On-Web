package com.service;

import com.model.Site;
import com.repository.SiteRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class CheckService {
    @Autowired
    private SiteRepository siteRepository;

    @Scheduled(fixedDelay = 60000) // 1분마다 실행, 추후에 어느시간 간격으로 알림받을지 설정 기능 추가하기
    public void checkSites() {
        List<Site> sites = siteRepository.findAll(); // 모든 사이트 가져오기
        for (Site site : sites) {
            try{
                Document doc = Jsoup.connect(site.getUrl()).userAgent("Mozilla").get();
                String currentContent = doc.body().text().substring(0,500); // 앞 500자만 비교
                if (site.getLastContent() == null) { //처음 등록된 경우
                    System.out.println("new site " + site.getUrl());
                    site.setLastContent(currentContent);
                } else if (!site.getLastContent().equals(currentContent)) {
                    //내용이 변경된 경우
                    System.out.println("Content changed for site: " + site.getUrl());
                    site.setLastContent(currentContent);
                    site.setLastModified(java.time.LocalDateTime.now());
                    //여기서 알림 보내기 기능 추가 가능
                }
                siteRepository.save(site); // 변경된 내용 저장
            } catch (IOException e){
                System.err.println(site.getUrl() + " 접속 실패: " + e.getMessage());
            }
        }
    }
}

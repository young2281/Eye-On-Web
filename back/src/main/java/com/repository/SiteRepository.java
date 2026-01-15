package com.repository;

import com.model.Site;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SiteRepository extends JpaRepository<Site, Long> {
    //모든 사이트 목록 가져오기
}

package com.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Site {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url; // 감시할 사이트의 URL
    @Column(length = 1000)
    private String lastContent; // 비교할 마지막으로 감지된 내용
    private LocalDateTime lastModified; // 마지막으로 감지된 시간
}

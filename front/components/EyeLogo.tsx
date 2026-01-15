'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function EyeLogo() {
  // 눈동자의 실제 좌표 값
  const eyeX = useMotionValue(0);
  const eyeY = useMotionValue(0);

  // 부드러운 움직임을 위한 스프링 설정
  const springConfig = { damping: 20, stiffness: 200 };
  const sprX = useSpring(eyeX, springConfig);
  const sprY = useSpring(eyeY, springConfig);

  // 눈 위치를 참조하기 위한 Ref
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current) return;

      // 1. 눈 중심 위치 계산
      const rect = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      // 2. 마우스와 눈 중심 사이의 거리 계산 (dx, dy)
      const dx = e.clientX - eyeCenterX;
      const dy = e.clientY - eyeCenterY;

      // 3. 각도 계산 (atan2)
      const angle = Math.atan2(dy, dx);

      // 4. 눈동자가 이동할 최대 반지름 (눈 반지름 - 눈동자 반지름)
      // 로고가 작아졌으므로 8~10px 정도가 적당합니다.
      const distance = 8; 

      // 5. 방향에 따른 최종 좌표 설정 (고정된 거리만큼만 이동)
      eyeX.set(Math.cos(angle) * distance);
      eyeY.set(Math.sin(angle) * distance);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [eyeX, eyeY]);

  return (
    <div className="p-4">
      {/* 왼쪽 상단 로고 영역 */}
      <div className="fixed top-6 left-6 flex items-center gap-3">
        {/* 눈 로고 */}
        <div ref={eyeRef} className="flex gap-1.5 p-2 bg-white/10 rounded-2xl border border-white/20">
          {[1, 2].map((i) => (
            <div key={i} className="w-8 h-8 bg-white rounded-full flex items-center justify-center relative shadow-lg">
              <motion.div
                style={{ x: sprX, y: sprY }}
                className="w-3.5 h-3.5 bg-black rounded-full relative"
              >
              </motion.div>
            </div>
          ))}
        </div>
        
        {/* 로고 텍스트 */}
        <h1 
          className="text-1.7xl font-normal text-black transition-all">
          FOMO <span className="text-gray-500">alarm</span>
        </h1>
      </div>

      {/* 대시보드 메인 콘텐츠 예시 */}
      {/* <div className="pt-24 px-8">
        <h2 className="text-gray-400 text-sm font-medium mb-4">현재 모니터링 상태</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-32 bg-grey/5 border border-white/10 rounded-3xl" />
          <div className="h-32 bg-grey/5 border border-white/10 rounded-3xl" />
          <div className="h-32 bg-grey/5 border border-white/10 rounded-3xl" />
        </div>
      </div> */}
    </div>
  );
}
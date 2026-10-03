import {useRef} from 'react';
import {useMediaQuery} from "react-responsive";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {performanceImages, performanceImgPositions} from '../constants/index.js';

const Performance = () => {
    const sectionRef = useRef(null);
    const isMobile = useMediaQuery({query: '(max-width: 1024px)'});

    useGSAP(() => {
        const section = sectionRef.current;

        // Paragraph fade-in + slide-up animation (all devices)
        gsap.fromTo(section.querySelector('.content p'),
            {opacity: 0, y: 10},
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section.querySelector('.content p'),
                    start: 'top bottom',
                    end: 'top center',
                    scrub: true,
                    invalidateOnRefresh: true,
                }
            }
        );

        // Desktop-only: scrubbed image timeline
        if (!isMobile) {

            const timeline = gsap.timeline({
                defaults: {ease: 'power1.inOut', duration: 2, overwrite: "auto"},
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'center center',
                    scrub: 1,
                    invalidateOnRefresh: true,
                }
            });

            // Animate each image (except p5) to its final position
            performanceImgPositions.forEach(pos => {
                if (pos.id === 'p5') return;

                const target = `.${pos.id}`;
                const vars = {};

                if (pos.left !== undefined) vars.left = `${pos.left}%`;
                if (pos.right !== undefined) vars.right = `${pos.right}%`;
                if (pos.bottom !== undefined) vars.bottom = `${pos.bottom}%`;
                if (pos.transform) vars.transform = pos.transform;

                timeline.to(target, vars, 0);
            });
        }
    }, {scope:sectionRef, dependencies: [isMobile]});

    return (
        <section id="performance" ref={sectionRef}>
            <h2>Next-level graphics performance. Game on.</h2>

            <div className="wrapper">
                {performanceImages.map(({id, src}) => (
                    <img key={id} className={id} src={src} alt={id}/>
                ))}
            </div>

            <div className="content">
                <p>
                    Run graphics-intensive workflows with a responsiveness that keeps up with your imagination. The M4 family of chips features a GPU with a second-generation hardware-accelerated ray tracing engine that renders images faster, so
                    {' '} <span className="text-white">
                    gaming feels more immersive and realistic than ever.
                          </span>{' '}

                    And Dynamic Caching optimizes fast on-chip memory to dramatically increase average GPU utilization — driving a huge performance boost for the most demanding pro apps and games.
                </p>
            </div>

        </section>
    );
};

export default Performance;
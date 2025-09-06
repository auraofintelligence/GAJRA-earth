document.addEventListener('DOMContentLoaded', function() {
    const infoPanel = document.getElementById('info-panel');
    const infoTitle = document.getElementById('info-title');
    const infoDescription = document.getElementById('info-description');
    const closeBtn = document.getElementById('close-btn');

    const gData = {
        nodes: [
            [cite_start]{ id: 0, name: 'G.A.J.R.A. Earth', description: 'Stands for "Global Association for Joyful Responsible Abundance on Earth." It is a not-for-profit initiative designed to harness volunteerism and XR technologies to address sustainable development goals and foster global unity. [cite: 1493, 1495, 1496]' },
            [cite_start]{ id: 1, name: 'Aura of Intelligence', description: 'A tech start-up creating an extended reality (XR) digital twin of a user\'s body and mind, which integrates with generative AI, blockchain, and IoT devices to augment human capabilities. [cite: 1485, 1488, 1489, 1490]' },
            [cite_start]{ id: 2, name: 'Live Aid 2025/2035', description: 'Large-scale global art and music events marking the 40th and 50th anniversaries of Live Aid, aimed at promoting global unity and collective voting on core values. [cite: 1497, 1502]' },
            [cite_start]{ id: 3, name: 'Gamify Democracy', description: 'An initiative to make the democratic process more interactive and intellectually stimulating by using gaming principles and generative AI. [cite: 1519, 1520]' },
            [cite_start]{ id: 4, name: 'ICO & DAO', description: 'An Initial Coin Offering (ICO) and a Decentralized Autonomous Organization (DAO) are planned to democratize investment and governance for the GAJRA Earth ecosystem. [cite: 1467]' },
            [cite_start]{ id: 5, name: 'Queens Venture Capital', description: 'A series of venture capital firms (500, 10,000, and 50,000 Queens) focused on empowering female entrepreneurship and addressing gender disparity in VC funding globally. [cite: 1529, 1530, 1535, 1540]' },
            [cite_start]{ id: 6, name: 'Aura Entrepreneurs Co-Living', description: 'A co-living network for entrepreneurs and volunteers to cohabit, collaborate, and foster a community of innovation and social impact. [cite: 1525, 1526]' },
            [cite_start]{ id: 7, name: 'Aura Smart Pod Hotels', description: 'High-tech capsule hotels equipped with automation, XR, and AI, designed as hubs for rest, productivity, and collaboration for the traveling Aura community. [cite: 1562, 1563, 1564]' },
            [cite_start]{ id: 8, name: 'Aura Innovation Labs', description: 'Creative spaces within educational institutions to nurture innovation by leveraging Aura of Intelligence technology for learning and research. [cite: 1568, 1569]' }
        ],
        links: [
            { source: 0, target: 1 }, { source: 0, target: 2 },
            { source: 0, target: 3 }, { source: 0, target: 4 },
            { source: 0, target: 5 }, { source: 1, target: 6 },
            { source: 1, target: 7 }, { source: 1, target: 8 }
        ]
    };

    const Graph = ForceGraph3D()(document.getElementById('3d-graph'))
        .graphData(gData)
        .nodeLabel('name')
        .nodeAutoColorBy('id')
        .linkWidth(0.5)
        .linkDirectionalParticles(1)
        .linkDirectionalParticleWidth(1.5)
        .onNodeClick(node => {
            // Center camera on node
            const distance = 80;
            const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
            Graph.cameraPosition(
                { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio },
                node,
                1000 
            );
            
            // Show info panel
            infoTitle.textContent = node.name;
            infoDescription.textContent = node.description;
            infoPanel.classList.remove('hidden');
        });

    closeBtn.addEventListener('click', () => {
        infoPanel.classList.add('hidden');
    });

    // Add a central, more prominent node for GAJRA Earth
    Graph.nodeThreeObject(node => {
        if (node.id === 0) {
            const geometry = new THREE.IcosahedronGeometry(8, 0);
            const material = new THREE.MeshPhongMaterial({
                color: '#00d4ff',
                emissive: '#00aaff',
                shininess: 50,
                wireframe: true,
                transparent: true,
                opacity: 0.8
            });
            return new THREE.Mesh(geometry, material);
        }
    });

    // Add lighting
    const scene = Graph.scene();
    const ambientLight = new THREE.AmbientLight(0xbbbbbb);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(-1, 1, 1);
    scene.add(directionalLight);

});

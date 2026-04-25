// Generate placeholder images for the blood donation app
// This script can be run in a browser console to generate placeholder images

function generatePlaceholderImage(text, width = 400, height = 300, bgColor = '#d2691e', textColor = '#ffffff') {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = width;
    canvas.height = height;
    
    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
    
    // Add some gradient effect
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, bgColor);
    gradient.addColorStop(1, adjustColor(bgColor, -20));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Text
    ctx.fillStyle = textColor;
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Split text into lines if it's too long
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];
    
    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const testLine = currentLine + ' ' + word;
        const testWidth = ctx.measureText(testLine).width;
        
        if (testWidth > width - 40) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    }
    lines.push(currentLine);
    
    // Draw text lines
    const lineHeight = 30;
    const totalHeight = lines.length * lineHeight;
    const startY = (height - totalHeight) / 2;
    
    lines.forEach((line, index) => {
        ctx.fillText(line, width / 2, startY + index * lineHeight);
    });
    
    // Add a subtle border
    ctx.strokeStyle = adjustColor(bgColor, 30);
    ctx.lineWidth = 2;
    ctx.strokeRect(2, 2, width - 4, height - 4);
    
    return canvas.toDataURL('image/png');
}

function adjustColor(color, amount) {
    const hex = color.replace('#', '');
    const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
    const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
    const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Generate all placeholder images
function generateAllPlaceholders() {
    const images = [
        { name: 'blood-donation-hero', text: 'Blood Donation Hero', width: 500, height: 300, color: '#4CAF50' },
        { name: 'donor-phone', text: 'Donor with Phone', width: 400, height: 300, color: '#2196F3' },
        { name: 'blood-drop', text: 'Blood Drop Symbol', width: 400, height: 300, color: '#f44336' },
        { name: 'donation-process', text: 'Donation Process', width: 400, height: 300, color: '#9C27B0' },
        { name: 'save-lives', text: 'Save Lives', width: 400, height: 300, color: '#4CAF50' },
        { name: 'community-help', text: 'Help Community', width: 400, height: 300, color: '#FF9800' },
        { name: 'safe-process', text: 'Safe Process', width: 400, height: 300, color: '#607D8B' },
        { name: 'hospital', text: 'Healthcare Facilities', width: 400, height: 300, color: '#795548' },
        { name: 'emergency', text: 'Emergency Response', width: 400, height: 300, color: '#E91E63' },
        { name: 'volunteer', text: 'Volunteer Network', width: 400, height: 300, color: '#00BCD4' }
    ];
    
    const container = document.createElement('div');
    container.style.cssText = 'position: fixed; top: 20px; right: 20px; background: white; padding: 20px; border: 2px solid #333; border-radius: 10px; max-height: 80vh; overflow-y: auto; z-index: 10000;';
    
    const title = document.createElement('h3');
    title.textContent = 'Generated Placeholder Images';
    title.style.margin = '0 0 20px 0';
    container.appendChild(title);
    
    images.forEach(img => {
        const imgContainer = document.createElement('div');
        imgContainer.style.cssText = 'margin-bottom: 20px; text-align: center;';
        
        const imgElement = document.createElement('img');
        imgElement.src = generatePlaceholderImage(img.text, img.width, img.height, img.color);
        imgElement.style.cssText = 'max-width: 100%; border: 1px solid #ccc; border-radius: 5px;';
        
        const downloadBtn = document.createElement('button');
        downloadBtn.textContent = `Download ${img.name}.png`;
        downloadBtn.style.cssText = 'margin-top: 10px; padding: 8px 16px; background: #d2691e; color: white; border: none; border-radius: 5px; cursor: pointer;';
        
        downloadBtn.onclick = () => {
            const link = document.createElement('a');
            link.download = `${img.name}.png`;
            link.href = imgElement.src;
            link.click();
        };
        
        imgContainer.appendChild(imgElement);
        imgContainer.appendChild(document.createElement('br'));
        imgContainer.appendChild(downloadBtn);
        container.appendChild(imgContainer);
    });
    
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.style.cssText = 'position: absolute; top: 10px; right: 10px; background: #f44336; color: white; border: none; border-radius: 5px; padding: 5px 10px; cursor: pointer;';
    closeBtn.onclick = () => document.body.removeChild(container);
    container.appendChild(closeBtn);
    
    document.body.appendChild(container);
}

// Instructions for usage
console.log(`
To generate placeholder images:

1. Run this in your browser console on any webpage
2. Call generateAllPlaceholders() to generate all images
3. Download each image by clicking the download buttons
4. Save the images to your src/assets/images/ folder
5. Replace the placeholder image paths in your HTML with the actual image files

Or call generatePlaceholderImage(text, width, height, bgColor, textColor) for individual images.
`);

// Export functions for use
window.generatePlaceholderImage = generatePlaceholderImage;
window.generateAllPlaceholders = generateAllPlaceholders;

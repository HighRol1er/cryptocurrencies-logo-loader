import sharp from "sharp";
import path from "path";
import fs from "fs/promises";

async function resizeImages() {
  const sourceDir = path.join(process.cwd(), "ticker", "icons");

  try {
    // 디렉토리 내의 모든 파일 읽기
    const files = await fs.readdir(sourceDir);

    console.log(`📁 Found ${files.length} images to process`);

    let processedCount = 0;
    let totalOriginalSize = 0;
    let totalCompressedSize = 0;

    // 각 이미지 파일 처리
    for (const file of files) {
      if (!file.match(/\.(jpg|jpeg|png|webp)$/i)) continue;

      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(sourceDir, file);

      try {
        // 원본 파일 크기 확인
        const originalStats = await fs.stat(sourcePath);
        const originalSize = originalStats.size;
        totalOriginalSize += originalSize;

        await sharp(sourcePath)
          .resize(64, 64, {
            fit: "cover",
            position: "center",
          })
          .webp({
            quality: 70,
            effort: 6,
            nearLossless: false,
            smartSubsample: true,
          })
          .toFile(targetPath.replace(".png", ".webp") + ".tmp");

        // 임시 파일을 원본 파일로 이동
        await fs.unlink(sourcePath);
        await fs.rename(
          targetPath.replace(".png", ".webp") + ".tmp",
          targetPath.replace(".png", ".webp")
        );

        // 압축 후 파일 크기 확인
        const compressedStats = await fs.stat(
          targetPath.replace(".png", ".webp")
        );
        const compressedSize = compressedStats.size;
        totalCompressedSize += compressedSize;

        const compressionRatio = (
          ((originalSize - compressedSize) / originalSize) *
          100
        ).toFixed(1);

        console.log(
          `✅ Resized: ${file} → ${file.replace(
            ".png",
            ".webp"
          )} (${originalSize} → ${compressedSize} bytes, ${compressionRatio}% reduction)`
        );
        processedCount++;
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error);
      }
    }

    // 전체 결과 요약
    const totalCompressionRatio = (
      ((totalOriginalSize - totalCompressedSize) / totalOriginalSize) *
      100
    ).toFixed(1);
    const totalOriginalMB = (totalOriginalSize / 1024 / 1024).toFixed(2);
    const totalCompressedMB = (totalCompressedSize / 1024 / 1024).toFixed(2);

    console.log("\n" + "=".repeat(60));
    console.log("📊 이미지 리사이징 완료!");
    console.log("=".repeat(60));
    console.log(`✅ 처리된 이미지: ${processedCount}개`);
    console.log(`📁 원본 크기: ${totalOriginalMB} MB`);
    console.log(`📁 압축 후 크기: ${totalCompressedMB} MB`);
    console.log(`📉 전체 압축률: ${totalCompressionRatio}%`);
    console.log(
      `💾 절약된 용량: ${
        (totalOriginalSize - totalCompressedSize) / 1024 / 1024
      } MB`
    );
  } catch (error) {
    console.error("❌ Failed to process images:", error);
  }
}

// 스크립트 실행
resizeImages();

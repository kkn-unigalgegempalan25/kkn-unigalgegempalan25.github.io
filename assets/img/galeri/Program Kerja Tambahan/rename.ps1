$folderPath = "D:\Herd\kkn-unigalgegempalan25\assets\img\galeri\Program Kerja Tambahan"  # Ganti dengan lokasi folder tempat file berada

# Ambil semua file dalam folder
Get-ChildItem -Path $folderPath -File | ForEach-Object {
    $newName = $_.Name -replace "_", " "  # Ganti underscore dengan spasi
    $newName = $newName -replace " (\w+)$", ""  # Hapus teks acak di akhir nama

    # Buat path baru
    $newPath = Join-Path -Path $folderPath -ChildPath $newName

    # Rename file
    Rename-Item -Path $_.FullName -NewName $newName -Force
    Write-Output "Renamed: $($_.Name) -> $newName"
}

Write-Output "Selesai!"

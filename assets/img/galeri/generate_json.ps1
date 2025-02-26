$basePath = "assets/img/galeri"
$files = Get-ChildItem -Path $basePath -Recurse -File | ForEach-Object {
    $relativePath = $_.FullName -replace [regex]::Escape((Get-Location).Path), "" -replace "\\", "/"
    @{
        Category = $_.Directory.Name
        Path     = $relativePath.TrimStart("/")
    }
}

$jsonData = $files | Group-Object -Property Category | ForEach-Object {
    @{($_.Name) = $_.Group.Path }
} | ConvertTo-Json -Depth 10

$jsonData | Set-Content "output.json"
Write-Output "JSON berhasil dibuat: output.json"

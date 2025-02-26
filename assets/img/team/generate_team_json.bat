@echo off
setlocal enabledelayedexpansion

echo [ > team.json
set "first=true"

for %%F in (*.png *.jpg) do (
    set "filename=%%~nF"
    for /f "tokens=1,2 delims=-" %%A in ("!filename!") do (
        set "name=%%A"
        set "role=%%B"
        set "name=!name:~0,-1!"
        set "role=!role:~1!"

        rem Tentukan urutan jabatan
        set "order=99"
        if /i "!role!"=="KETUA" set "order=1"
        if /i "!role!"=="WAKIL KETUA" set "order=2"
        if /i "!role!"=="SEKRETARIS I" set "order=3"
        if /i "!role!"=="SEKRETARIS II" set "order=4"
        if /i "!role!"=="BENDAHARA I" set "order=5"
        if /i "!role!"=="BENDAHARA II" set "order=6"
        if /i "!role!"=="ACARA" set "order=7"
        if /i "!role!"=="HUMAS" set "order=8"
        if /i "!role!"=="PDD" set "order=9"
        if /i "!role!"=="LOGISTIK" set "order=10"

        if "!first!"=="true" (
            set "first=false"
        ) else (
            echo , >> team.json
        )

        echo    { >> team.json
        echo        "name": "!name!", >> team.json
        echo        "role": "!role!", >> team.json
        echo        "file": "assets/img/team/%%F", >> team.json
        echo        "order": !order! >> team.json
        echo    } >> team.json
    )
)

echo ] >> team.json
echo team.json has been generated successfully!

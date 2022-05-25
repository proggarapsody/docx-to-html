[Reflection.Assembly]::LoadWithPartialName("Microsoft.Office.Interop.Word") | Out-Null
$srcfiles = Get-ChildItem -Path . -Recurse -Filter "*.doc*"
$saveFormat = [Microsoft.Office.Interop.Word.WdSaveFormat]::wdFormatFilteredHTML
$word = new-object -comobject word.application
$word.Visible = $False

ForEach ($doc in $srcfiles) {
    Write-Host "Processing :" $doc.fullname
    $name = Join-Path -Path $doc.DirectoryName -ChildPath $("page-" + $doc.BaseName + ".html")

    Write-Host "Name is now:" $name

    $word.Visible = $False

    $opendoc = $word.documents.open($doc.FullName)
    $opendoc.SaveAs([ref][system.object]$name, [ref]$saveFormat)
    $opendoc.Close()

    $doc = $null
}

$word.quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
Remove-Variable word
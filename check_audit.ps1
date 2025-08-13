Write-Host "`n=== AUDIT QUALITY CHECK ===" -ForegroundColor Cyan

# Check evidence count
Write-Host "`n1. Evidence Tags Count:"
$count = (Get-Content TECHNICAL_AUDIT_*.md | Select-String -Pattern '\[TESTED\]|\[ANALYZED\]' | Measure-Object).Count
Write-Host "   Found $count evidence tags (20+ is good, 10-20 is borderline, <10 needs work)"

# Check what stages ran
Write-Host "`n2. Stages Executed:"
Get-Content TECHNICAL_AUDIT_*.md | Select-String -Pattern "=== .* ===" | ForEach-Object { Write-Host "   - $_" }

# Check for blocked/timeout issues
Write-Host "`n3. Blocked/Timeout Issues:"
$issues = Get-Content TECHNICAL_AUDIT_*.md | Select-String -Pattern '\[BLOCKED\]|\[TIMEOUT\]'
if ($issues) {
    $issues | ForEach-Object { Write-Host "   - $_" }
} else {
    Write-Host "   No blocking issues found"
}

# Check for critical findings
Write-Host "`n4. Priority Findings:"
$p1 = (Get-Content TECHNICAL_AUDIT_*.md | Select-String -Pattern 'P1|CRITICAL').Count
$p2 = (Get-Content TECHNICAL_AUDIT_*.md | Select-String -Pattern 'P2|HIGH').Count
$p3 = (Get-Content TECHNICAL_AUDIT_*.md | Select-String -Pattern 'P3|MEDIUM').Count
$p4 = (Get-Content TECHNICAL_AUDIT_*.md | Select-String -Pattern 'P4|LOW').Count
Write-Host "   P1/Critical: $p1 mentions"
Write-Host "   P2/High: $p2 mentions"
Write-Host "   P3/Medium: $p3 mentions"
Write-Host "   P4/Low: $p4 mentions"

# Check actual findings
Write-Host "`n5. Actual Test Results:"
$tested = Get-Content TECHNICAL_AUDIT_*.md | Select-String -Pattern '\[TESTED\]'
Write-Host "   Total [TESTED] items: $($tested.Count)"
$analyzed = Get-Content TECHNICAL_AUDIT_*.md | Select-String -Pattern '\[ANALYZED\]'
Write-Host "   Total [ANALYZED] items: $($analyzed.Count)"
$inferred = Get-Content TECHNICAL_AUDIT_*.md | Select-String -Pattern '\[INFERRED\]'
Write-Host "   Total [INFERRED] items: $($inferred.Count)"

# Summary
Write-Host "`n6. Audit Summary:"
if ($count -ge 20) {
    Write-Host "   QUALITY: Good - Comprehensive evidence-based audit" -ForegroundColor Green
} elseif ($count -ge 10) {
    Write-Host "   QUALITY: Borderline - Acceptable but could be more thorough" -ForegroundColor Yellow
} else {
    Write-Host "   QUALITY: Needs Work - Insufficient evidence tags" -ForegroundColor Red
}

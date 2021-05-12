$(document).ready(function()
{
    var htmlSrc = $(".gcode-page").html();

    var gcodeNameFormat = '<p class="gcode-name"><strong>gcode-name-key</strong> - gcode-title<br /></p>';
    var gcodeSubTitleFormat = '<p class="border rounded gcode-subTitle">gcode-subTitle-key<br /></p>';
    var gcodeDescriptionTextFormat = '<p class="description-text">gcode-description-text-key</p>'
    var gcodePrefixFormat = '<span class="gcode-prefix">gcode-prefix-key</span>';
    var gcodeExampleFormat = '<div class="border rounded gcode-example"><code class="text-primary">gcode-example-key</code></div>';
    var gcodeCommentFormat = '<em class="gcode-cm">&nbsp;&nbsp;&nbsp;&nbsp;;gcode-cm-key<br></em>'
    var gcodeUsageTextFormat = '<p class="border rounded-0 d-inline-block usage-text">usage-text-key</p>'
    var gcodeRobotTag1Format = '<span class="bg-danger border rounded robot-tag">robot-tag-key</span>';
    var gcodeRobotTag2Format = '<span class="bg-info border rounded robot-tag">robot-tag-key</span>';
    var gcodeRobotTag3Format = '<span class="bg-dark border rounded robot-tag">robot-tag-key</span>';
    var gcodeTagFormat = '<p class="bg-success border rounded d-inline-block usage-parameter">gcode-tag-key<br /></p>';
    var gcodeParameterPanelFormat = '<div class="border rounded gcode-parameter-panel" style="padding-left: 14px;">gcode-parameter-panel-key</div>'
    var gcodeTableFormat = '<div class="d-table"><table class="table table-sm"><tbody>gcode-table-key</tbody></table></div>';
    var gcodeRowFormat = '<tr>gcode-row-key</tr>';
    var gcodeCell1Format = '<td class="d-flex"><br /><p class="gcode-parameter">gcode-cell1-key<br /></p></td>';
    var gcodeCell2Format = '<td>gcode-cell2-key<br /></td>';
    var gcodeNoteFormat = '<div class="border rounded gcode-note"><p class="gcode-note-title" style="color: rgb(255,255,255);">Notes</p>gcode-note-key</div>';
    var gcodeNoteLineFormat = '<p class="gcode-note-text">▶ gcode-note-line-key</p>';

    htmlSrc = FormatDocument2(htmlSrc, "[gcode-name]", "[/gcode-name]", " - ", gcodeNameFormat, "gcode-name-key", "gcode-title");
    htmlSrc = FormatDocument1(htmlSrc, "[gcode-subTitle]", "[/gcode-subTitle]", gcodeSubTitleFormat, "gcode-subTitle-key");
    htmlSrc = FormatDocument1(htmlSrc, "[description-text]", "[/description-text]", gcodeDescriptionTextFormat, "gcode-description-text-key");
    htmlSrc = FormatDocument1(htmlSrc, "[gcode-prefix]", "[/gcode-prefix]", gcodePrefixFormat, "gcode-prefix-key");
    htmlSrc = FormatDocument1(htmlSrc, "[gcode-example]", "[/gcode-example]", gcodeExampleFormat, "gcode-example-key");
    htmlSrc = FormatDocument1(htmlSrc, " ;", "<br>", gcodeCommentFormat, "gcode-cm-key");
    htmlSrc = FormatDocument1(htmlSrc, "[gcode-usage]", "[/gcode-usage]", gcodeUsageTextFormat, "usage-text-key");
    htmlSrc = FormatDocument1(htmlSrc, "[gcode-robot-tag1]", "[/gcode-robot-tag1]", gcodeRobotTag1Format, "robot-tag-key");
    htmlSrc = FormatDocument1(htmlSrc, "[gcode-robot-tag2]", "[/gcode-robot-tag2]", gcodeRobotTag2Format, "robot-tag-key");
    htmlSrc = FormatDocument1(htmlSrc, "[gcode-robot-tag3]", "[/gcode-robot-tag3]", gcodeRobotTag3Format, "robot-tag-key");
    htmlSrc = FormatDocument1(htmlSrc, "[gcode-tag]", "[/gcode-tag]", gcodeTagFormat, "gcode-tag-key");
    htmlSrc = FormatDocument1(htmlSrc, "[gcode-parameter-panel]", "[/gcode-parameter-panel]", gcodeParameterPanelFormat, "gcode-parameter-panel-key");
    htmlSrc = FormatDocument1(htmlSrc, "[gcode-table]", "[/gcode-table]", gcodeTableFormat, "gcode-table-key");
    htmlSrc = FormatDocument1(htmlSrc, "[gcode-row]", "[/gcode-row]", gcodeRowFormat, "gcode-row-key");
    htmlSrc = FormatDocument1(htmlSrc, "[gcode-cell1]", "[/gcode-cell1]", gcodeCell1Format, "gcode-cell1-key");
    htmlSrc = FormatDocument1(htmlSrc, "[gcode-cell2]", "[/gcode-cell2]", gcodeCell2Format, "gcode-cell2-key");
    htmlSrc = FormatDocument1(htmlSrc, "[gcode-note]", "[/gcode-note]", gcodeNoteFormat, "gcode-note-key");
    htmlSrc = FormatDocument1(htmlSrc, "[gcode-note-line]", "[/gcode-note-line]", gcodeNoteLineFormat, "gcode-note-line-key");

    $(".gcode-page").html(htmlSrc);

    function FormatDocument1(src, t1, t2, rp, key)
    {
        var cursor1 = src.indexOf(t1);
        var cursor2 = src.indexOf(t2);

        //console.log(cursor);

        var t1Pos = 0;
        var t2Pos = 0;

        while (cursor1 > -1 && cursor2 > -1)
        {
            t1Pos = src.indexOf(t1, t2Pos);
            t2Pos = src.indexOf(t2, t1Pos);
            if (t2Pos == -1)
                break;

            var replaceSection = src.substring(t1Pos, t2Pos + t2.length);
            console.log(replaceSection);
            var valueInTag = replaceSection.substring(t1.length, replaceSection.length - t2.length);
            console.log(valueInTag);
            var newFormatSection = rp.replace(key, valueInTag);
            console.log(newFormatSection);
            src = src.replace(replaceSection, newFormatSection);
            
            cursor1 = src.indexOf(t1, t2Pos);
            cursor2 = src.indexOf(t2, t2Pos);
        }        
        
        console.log(src);

        return src;
    }

    function FormatDocument2(src, t1, t2, symbol, rp, key1, key2) 
    {
        var cursor = src.indexOf(t1);

        while (cursor > -1)
        {
            var replaceSection = src.substring(src.lastIndexOf(t1), src.lastIndexOf(t2) +  + t2.length);
            //console.log(replaceSection);
            var valuesInTag = replaceSection.substring(t1.length, replaceSection.length - t2.length);
            var value1InTag = valuesInTag.substring(0, valuesInTag.lastIndexOf(symbol));
            var value2InTag = valuesInTag.substring(valuesInTag.lastIndexOf(symbol) + symbol.length);
            //console.log(valuesInTag);
            var newFormatSection = rp.replace(key1, value1InTag);
            newFormatSection = newFormatSection.replace(key2, value2InTag);
            //console.log(newFormatSection);
            src = src.replace(replaceSection, newFormatSection);

            cursor = src.indexOf(t1);
        }

        return src;
    }



});
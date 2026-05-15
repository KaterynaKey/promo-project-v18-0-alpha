function generateDynamicImgSrc(index) {
    // Назва з інпуту (наприклад abdc123)
    const rawName = document.getElementById('fileName').value.trim() || 'PROMO';
    const promoName = rawName.replace(/\s+/g, '').toLowerCase();

    // Витягуємо букви і цифри
    const prefixMatch = promoName.match(/[a-z]+/);
    const suffixMatch = promoName.match(/\d+/);

    const prefix = prefixMatch ? prefixMatch[0] : 'promo';
    const suffix = suffixMatch ? suffixMatch[0] : '0';

    return `https://alphaonest.com/files/promo/${prefix}/lift-${suffix}/img-${index}.jpg`;
}

const prettier = window.prettier;
const prettierPluginHtml = window.prettierPlugins.html;

async function formatWithPrettier(htmlString) {
    try {
        let formatted = await window.prettier.format(htmlString, {
            parser: 'html',
            plugins: window.prettierPlugins,
            printWidth: 120,
            tabWidth: 2,
            useTabs: false,
            singleAttributePerLine: false,
            bracketSameLine: true,
            htmlWhitespaceSensitivity: 'ignore',
        });

        formatted = formatted.trim();

        formatted = formatted.replace(/(<[a-z0-9]+)\s+([^>]+?)\s*>/gi, (match, tag, attrs) => {
            const cleanAttrs = attrs.replace(/\s+/g, ' ').trim();
            return `${tag} ${cleanAttrs}>`;
        });

        formatted = formatted.replace(/<br\s*\/?>/gi, '<br>');
        formatted = formatted.replace(/<br>\s+(?=<br>)/g, '<br>');

        formatted = formatted.replace(/\s+([.,!?:;])/g, '$1');

        formatted = formatted.replace(/(<a[^>]*>)([\s\S]*?)(<\/a>)/gi, (match, startTag, content, endTag) => {
            const cleanContent = content.replace(/\s+/g, ' ').trim();
            return `${startTag}${cleanContent}${endTag}`;
        });

        return formatted;
    } catch (e) {
        console.error('Ошибка Prettier:', e);
        return htmlString;
    }
}

//main js code
const blueColors = ['#0000FF', 'rgb\\(0,\\s*0,\\s*255\\)', '#CFE2F3', 'rgb\\(207,\\s*226,\\s*243\\)', '#9FC5E8', 'rgb\\(159,\\s*197,\\s*232\\)', '#6FA8DC', 'rgb\\(111,\\s*168,\\s*220\\)', '#3D85C6', 'rgb\\(61,\\s*133,\\s*198\\)', '#0B5394', 'rgb\\(11,\\s*83,\\s*148\\)', '#073763', 'rgb\\(7,\\s*55,\\s*99\\)', '#4A86E8', 'rgb\\(74,\\s*134,\\s*232\\)', '#C9DAF8', 'rgb\\(201,\\s*218,\\s*248\\)', '#A4C2F4', 'rgb\\(164,\\s*194,\\s*244\\)', '#6D9EEB', 'rgb\\(109,\\s*158,\\s*235\\)', '#1155CC', 'rgb\\(17,\\s*85,\\s*204\\)', '#1C4587', 'rgb\\(28,\\s*69,\\s*135\\)', '#3C78D8', 'rgb\\(60,\\s*120,\\s*216\\)', '#467886', 'rgb\\(70,\\s*120,\\s*134\\)', '#0033CC', 'rgb\\(0,\\s*51,\\s*204\\)', '#0066B3', 'rgb\\(0,\\s*102,\\s*179\\)']

function italicLinks(htmlContent) {
    htmlContent = htmlContent.replace(/<a[^>]*>/gi, '').replace(/<\/a>/gi, '');
    blueColors.forEach((color, index) => {
        const regex = new RegExp(`<span[^>]*style="[^"]*color:\\s*${color}[^"]*;[^"]*font-style:\\s*italic[^"]*"[^>]*>(.*?)<\\/span>`, 'gi');
        htmlContent = htmlContent.replace(regex, '<a href="urlhere" style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-weight: 700;color: #0404e4;text-decoration: underline;"><em>$1</em></a>');
    });

    return htmlContent;
}

function linksStyles(htmlContent) {
    blueColors.forEach((color, index) => {
        const reg = new RegExp(`<span[^>]*style="[^"]*color:\\s*(${color})[^"]*"[^>]*>(.*?)<\\/span>`, 'gi');
        htmlContent = htmlContent.replace(reg, '<a href="urlhere" style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-weight: 700;color: #0404e4;text-decoration: underline;">$2</a>');
    });

    return htmlContent;
}

function replaceAllEmojisAndSymbolsExcludingHTML(htmlContent) {
    const rx = /(?:\p{Extended_Pictographic}|(?![<>=&%"'#;:_-])[\p{S}\p{No}])(?:\uFE0F)?/gu;

    return htmlContent.replace(rx, match => {
        return Array.from(match)
            .map(ch => `&#${ch.codePointAt(0)};`)
            .join('');
    });
}


function processStyles(htmlContent) {
    htmlContent = htmlContent.replace(/<b[^>]*>/gi, '').replace(/<\/b>/gi, '');
    // i and b and u
    htmlContent = htmlContent.replace(/<span[^>]*style="[^"]*font-weight:\s*700[^"]*;[^"]*font-style:\s*italic[^"]*;[^"]*text-decoration:\s*underline[^"]*"[^>]*>(.*?)<\/span>/gi, '<i style="text-decoration: underline;font-weight: bold;">$1</i>');

    // i and u
    htmlContent = htmlContent.replace(/<span[^>]*style="[^"]*font-style:\s*italic[^"]*;[^"]*text-decoration:\s*underline[^"]*"[^>]*>(.*?)<\/span>/gi, '<i style="text-decoration: underline;">$1</i>');

    // i and b
    htmlContent = htmlContent.replace(/<span[^>]*style="[^"]*font-weight:\s*700[^"]*;[^"]*font-style:\s*italic[^"]*"[^>]*>(.*?)<\/span>/gi, '<b style="font-style: italic;">$1</b>');

    // b and u
    htmlContent = htmlContent.replace(/<span[^>]*style="[^"]*font-weight:\s*700[^"]*;[^"]*text-decoration:\s*underline[^"]*"[^>]*>(.*?)<\/span>/gi, '<b style="text-decoration: underline;">$1</b>');

    // u
    htmlContent = htmlContent.replace(/<span[^>]*style="[^"]*text-decoration:\s*underline[^"]*"[^>]*>(.*?)<\/span>/gi, '<u>$1</u>');

    // b
    htmlContent = htmlContent.replace(/<span[^>]*style="[^"]*font-weight:\s*700[^"]*"[^>]*>(.*?)<\/span>/gi, '<b>$1</b>');

    // i
    htmlContent = htmlContent.replace(/<span[^>]*style="[^"]*font-style:\s*italic[^"]*"[^>]*>(.*?)<\/span>/gi, '<i>$1</i>');


    //delete tags
    htmlContent = htmlContent.replace(/<a[^>]*>\s*<\/a>/g, ' ');
    htmlContent = htmlContent.replace(/<div[^>]*>/gi, '').replace(/<\/div>/gi, '');
    htmlContent = htmlContent.replace(/<span[^>]*>/gi, '').replace(/<\/span>/gi, '');
    htmlContent = htmlContent.replace(/<b>\s*<\/b>/g, '');

    //delete table tags update
    htmlContent = htmlContent.replace(/<table[^>]*>/gi, '').replace(/<\/table>/gi, '');
    htmlContent = htmlContent.replace(/<tbody[^>]*>/gi, '').replace(/<\/tbody>/gi, '');
    htmlContent = htmlContent.replace(/<tr[^>]*>/gi, '').replace(/<\/tr>/gi, '');
    htmlContent = htmlContent.replace(/<td[^>]*>/gi, '').replace(/<\/td>/gi, '');
    htmlContent = htmlContent.replace(/<col[^>]*>/gi, '').replace(/<\/col>/gi, '');
    htmlContent = htmlContent.replace(/<colgroup[^>]*>/gi, '').replace(/<\/colgroup>/gi, '');

    return htmlContent;
}

//end main js code


//html js code

function wrapSmallCenterTextHtml(htmlContent) {
    return htmlContent.replace(/<h6[^>]*style="[^"]*text-align:\s*center[^"]*"[^>]*>([\s\S]*?)<\/h6>/gi, function (match, content) {
        return `
                    </div>
                </td>
            </tr>
            <tr>
                <td align="center" style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:12px;font-style:normal;font-weight:normal;line-height:1.5;text-align:center;color:#000000; padding-top: 16px; padding-bottom: 16px;">
                  <div style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:12px;font-style:normal;font-weight:normal;line-height:1.5;text-align:center;color:#000000;">
                    ${content}
                  </div>
                </td>
            </tr>
            <tr>
               <td style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-top: 16px; padding-bottom: 16px;">
                  <div style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `;
    });
}

function wrapSmallTextHtml(htmlContent) {
    return htmlContent.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, function (match, content) {
        return `
                    </div>
                </td>
            </tr>
            <tr>
                <td style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:12px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000; padding-top: 16px; padding-bottom: 16px;">
                  <div style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:12px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
                    ${content}
                  </div>
                </td>
            </tr>
            <tr>
               <td style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-top: 16px; padding-bottom: 16px;">
                  <div style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `;
    });
}

function wrapCenterHeadlineHtml(htmlContent) {
    return htmlContent.replace(/<h1[^>]*style="[^"]*text-align:\s*center[^"]*"[^>]*>([\s\S]*?)<\/h1>/gi, function (match, content) {
        return `
                    </div>
                </td>
            </tr>
            <tr>
                <td align="center" style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:24px;font-style:normal;font-weight:bold;line-height:1.5;text-align:center;color:#000000;padding-top: 16px; padding-bottom: 16px;">
                  <b style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:24px;font-style:normal;font-weight:bold;line-height:1.5;text-align:center;color:#000000;">
                       ${content}
                  </b>
                </td>
              </tr>
            <tr>
               <td style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-top: 16px; padding-bottom: 16px;">
                  <div style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `;
    });
}


function wrapCenterQuoteHtml(htmlContent) {
    return htmlContent.replace(/<h4[^>]*style="[^"]*text-align:\s*center[^"]*"[^>]*>([\s\S]*?)<\/h4>/gi, function (match, content) {
        return `
                    </div>
                </td>
            </tr>
            <tr>
                <td align="center" style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:center;color:#000000; padding-left: 20px;padding-right: 20px;padding-top: 16px; padding-bottom: 16px;">
                  <div style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:center;color:#000000;">
                    ${content}
                  </div>
                </td>
            </tr> 
            <tr>
               <td style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-top: 16px; padding-bottom: 16px;">
                  <div style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `;
    });
}

function wrapQuoteHtml(htmlContent) {
    return htmlContent.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, function (match, content) {
        return `
                    </div>
                </td>
            </tr>
            <tr>
                <td style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000; padding-left: 20px;padding-right: 20px;padding-top: 16px; padding-bottom: 16px;">
                  <div style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
                    ${content}
                  </div>
                </td>
            </tr>            
            <tr>
               <td style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-top: 16px; padding-bottom: 16px;">
                  <div style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `;
    });
}

function wrapHeadlineHtml(htmlContent) {
    return htmlContent.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, function (match, content) {
        return `
                    </div>
                </td>
            </tr>
            <tr>
                <td style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:24px;font-style:normal;font-weight:bold;line-height:1.5;text-align:left;color:#000000;padding-top: 16px; padding-bottom: 16px;">
                  <b style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:24px;font-style:normal;font-weight:bold;line-height:1.5;text-align:left;color:#000000;">
                       ${content}
                  </b>
                </td>
              </tr>
            <tr>
               <td style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-top: 16px; padding-bottom: 16px;">
                  <div style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `;
    });
}

function wrapCenterTextHtml(htmlContent) {
    return htmlContent.replace(/<p[^>]*style="[^"]*text-align:\s*center[^"]*"[^>]*>([\s\S]*?)<\/p>/gi, function (match, content) {
        return `
                    </div>
                </td>
            </tr>
            <tr>
                <td align="center" style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:center;color:#000000;padding-top: 16px; padding-bottom: 16px;">
                    <div style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:center;color:#000000;">
                        ${content}
                    </div>
                </td>
            </tr>
            <tr>
               <td style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-top: 16px; padding-bottom: 16px;">
                  <div style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `;
    });
}


function wrapButtonHtml(htmlContent) {
    return htmlContent.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, function (match, content) {
        return `
                    </div>
                </td>
            </tr>
             
              <tr>
                 <td align="center" style="padding-top: 16px; padding-bottom: 16px;">

                    <table cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                            <td class="custom-button" height="53" align="center" style="border-radius: 10px;font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;line-height:1.5;text-align:center;font-weight: bold; color: #FFFFFF; padding: 3px 4px; background-color: #25b625;" bgcolor="#25b625">
                               <a href="urlhere" target="_blank" style="font-weight: bold;text-decoration:none;color:#ffffff;padding: 10px 20px;display: block;font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;line-height:1.5;text-align:center;background-color: #25b625; border-radius: 10px;">
                                    ${content}
                               </a>
                            </td>
                        </tr>
                    </table>
                 </td>
            </tr>
            <tr>
               <td style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-top: 16px; padding-bottom: 16px;">
                  <div style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `;
    });
}


//right-side-img
function wrapRightSideImg(htmlContent) {
    return htmlContent.replace(/i-r-s([\s\S]*?)i-r-s-e/gi, function (match, content) {
        return `
                    </div>
                </td>
            </tr>
              <tr>
                <td align="left" style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-bottom: 15px; padding-top: 15px;">
                  <a align="right" href="urlhere" target="_blank" style="display: inline-block; float: right; width: 50%; max-width: 50%; margin-left: 18px; margin-bottom: 12px;">
                    <img alt="Preview" height="224"
                         align="right"
                         src="https://alphaonest.com/"
                         style="border:0;display:inline-block;outline:none;text-decoration:none;height:auto;max-height: 224px;max-width: 100%; width: 100%;font-size:13px;object-fit: contain;"
                         width="250"/>
                  </a>
                  <div style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
                    ${content}
                  </div>
                </td>
              </tr>
            <tr>
               <td style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-top: 16px; padding-bottom: 16px;">
                  <div style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `;
    });
}

//right-side-img


//left-side-img
function wrapLeftSideImg(htmlContent) {
    return htmlContent.replace(/i-l-s([\s\S]*?)i-l-s-e/gi, function (match, content) {
        return `
                    </div>
                </td>
            </tr>
              <tr>
                <td align="left" style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-bottom: 16px; padding-top: 16px;">
                  <a align="left" href="urlhere" target="_blank" style="display: inline-block; float: left; width: 50%; max-width: 50%; margin-right: 18px; margin-bottom: 12px;">
                    <img alt="Preview" height="224"
                         align="left"
                         src="https://alphaonest.com/"
                         style="border:0;display:inline-block;outline:none;text-decoration:none;height:auto;max-height: 224px;max-width: 100%; width: 100%;font-size:13px;object-fit: contain;"
                         width="250"/>
                  </a>
                  <div style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
                    ${content}
                  </div>
                </td>
              </tr>
            <tr>
               <td style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-top: 16px; padding-bottom: 16px;">
                  <div style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `;
    });
}

//left-side-img-end

//signature-img
function wrapSignatureImg(htmlContent) {
    return htmlContent.replace(/sign-i([\s\S]*?)sign-i-e/gi, function (match, content) {
        return `
                    </div>
                </td>
            </tr>
            <tr>
                <td class="image-block" align="left" style="padding-top: 16px; padding-bottom: 16px;">
                   <img alt="Signature" height="auto"
                        src="https://alphaonest.com/"
                        style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:220px;max-width: 220px;font-size:13px;"
                        width="220"/>
                </td>
            </tr>
            <tr>
               <td style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-top: 16px; padding-bottom: 16px;">
                  <div style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `;
    });
}

//signature-img-end

//footer new logic start
function wrapFooterBlock(htmlContent) {
    return htmlContent.replace(/ftr-s([\s\S]*?)ftr-e/gi, function (match, content) {
        return `
                    </div>
                </td>
            </tr>
            <tr>
                <td style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:12px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000; padding-top: 25px; padding-bottom: 15px;">
                  <div style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:12px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
                    ${content}
                  </div>
                </td>
            </tr>
            <tr>
               <td style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-top: 16px; padding-bottom: 16px;">
                  <div style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `;
    });
}

function wrapFooterCenterBlock(htmlContent) {
    return htmlContent.replace(/ftr-c([\s\S]*?)ftr-c-e/gi, function (match, content) {
        return `
                    </div>
                </td>
            </tr>
            <tr>
                <td align="center" style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:12px;font-style:normal;font-weight:normal;line-height:1.5;text-align:center;color:#000000; padding-top: 25px; padding-bottom: 15px;">
                  <div style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:12px;font-style:normal;font-weight:normal;line-height:1.5;text-align:center;color:#000000;">
                    ${content}
                  </div>
                </td>
            </tr>
            <tr>
               <td style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-top: 16px; padding-bottom: 16px;">
                  <div style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `;
    });
}

//footer new logic end


function replaceTripleBrWithSingle (htmlContent) {
    const BR = `<br>\n`;
    htmlContent = htmlContent.replace(/(<br\s*\/?>\s*)+(<\/(?:div|td|tr|table|span)>)/gi, '$2');
    htmlContent = htmlContent.replace(
        /<\w+[^>]*>\s*<\w+[^>]*>\s*<br\s*\/?>\s*<\/\w+>\s*<\/\w+>/gi,
        BR
    );


    htmlContent = htmlContent.replace(
        /<\w+[^>]*>\s*<br\s*\/?>\s*<\/\w+>/gi,
        BR
    );

    htmlContent = htmlContent.replace(
        /\s*<br\s*\/?>\s*<\/(\w+)>/gi,
        '</$1><br>'
    );


    htmlContent = htmlContent.replace(/(?:<br\s*\/?>\s*){3,}/gi, BR);

    return htmlContent;
}
//one br end

//end html js code

//main js code
function addBrAfterClosingP(htmlContent) {
    // Delete extra <br>
    htmlContent = htmlContent.replace(/<br\s*\/?>/gi, '');

    // Add <br><br>
    htmlContent = htmlContent.replace(/<\/p>(?!\s*<\/li>)/gi, '</p>\n<br><br>\n');

    // add <br> (ol, ul).
    htmlContent = htmlContent.replace(/<br><br>(\s*<(ol|ul)[^>]*>)/gi, '<br>\n$1');

    // Delete extra <p>
    htmlContent = htmlContent.replace(/<p[^>]*>/gi, '').replace(/<\/p>/gi, '');

    return htmlContent;
}

function removeStylesFromLists(htmlContent) {
    htmlContent = htmlContent.replace(/<ol[^>]*style="[^"]*"[^>]*>/gi, '<ol>\n');
    htmlContent = htmlContent.replace(/<ul[^>]*style="[^"]*"[^>]*>/gi, '<ul>\n');
    htmlContent = htmlContent.replace(/<li[^>]*style="[^"]*"[^>]*>/gi, '<li>');
    htmlContent = htmlContent.replace(/<\/li*>/gi, '<\/li>\n');
    return htmlContent;
}

//end main js code

//html js code
function wrapTextInSpan(htmlContent) {
    htmlContent = htmlContent.replace(/<img[^>]*src="([^"]*)"[^>]*>/gi, function (match, src) {

        const dynamicSrc = generateDynamicImgSrc(window.currentImgIdx++)
        return `      </div>
                       </td>
                   </tr>
                   <tr>
                       <td class="image-full-wrapper" align="center" style="padding-top: 16px; padding-bottom: 16px;">
                           <a href="urlhere" target="_blank">
                               <img alt="Video preview" height="auto"
                                    src="${dynamicSrc}"
                                    style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;max-width: 562px;font-size:13px;"
                                    width="562"/>
                           </a>
                       </td>
                    </tr>
                    <tr>
                       <td style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-top: 16px; padding-bottom: 16px;">
                            <div style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">`;
    });

    htmlContent = `<tr>
                      <td style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-top: 16px; padding-bottom: 16px;">
                                <div style="font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
                                    ${htmlContent}
                                </div>
                      </td>
                    </tr>`;

    return htmlContent;
}

// end html js code

//main js code
function cleanEmptyHtmlTags(htmlContent) {
    console.log(htmlContent);
    htmlContent = htmlContent.replace(/&nbsp;/g, ' ');
    // <brbrbrbr>
    htmlContent = htmlContent.replace(/<b>\s*<\/b>/g, '');
    htmlContent = htmlContent.replace(/<li>\s*<\/li>/g, '');
    htmlContent = htmlContent.replace(/<br>\s*<br>\s*<br>\s*<br>/g, '<br><br>');
    htmlContent = htmlContent.replace(/<br>\s*<br>\s*<br>/g, '<br><br>');
    htmlContent = htmlContent.replace(/(<div[^>]*>)\s*<br><br>/gi, '$1');
    htmlContent = htmlContent.replace(/<\/a>\s*<a[^>]*>/g, ' ');
    htmlContent = htmlContent.replace(/<pre>/g, '');
    htmlContent = htmlContent.replace(/<a[^>]*>\s*<\/a>/g, ' ');
    htmlContent = htmlContent.replace(/<b[^>]*>\s*<\/b>/g, ' ');
    htmlContent = htmlContent.replace(/<u>\s*<\/u>/g, ' ');
    htmlContent = htmlContent.replace(/<em[^>]*>\s*<\/em>/g, ' ');
    htmlContent = htmlContent.replace(/<\/em>\s*<em[^>]*>/g, ' ');
    htmlContent = htmlContent.replace(/<i[^>]*>\s*<\/i>/g, ' ');
    htmlContent = htmlContent.replace(/<\/i>\s*<i[^>]*>/g, ' ');
    htmlContent = htmlContent.replace(/<a[^>]*>\s*<\/a>/g, ' ');
    htmlContent = htmlContent.replace(/<br><br>\s*<\/div>/g, '<\/div>');
    htmlContent = htmlContent.replace(/(<div[^>]*>)\s*<\/a>/gi, '$1');
    htmlContent = htmlContent.replace(/(<div[^>]*>)\s*<\/b>/gi, '$1');
    htmlContent = htmlContent.replace(/<a[^>]*>\s*<\/div>/g, '<\/div>');
    htmlContent = htmlContent.replace(/<b[^>]*>\s*<\/div>/g, '<\/div>');
    htmlContent = htmlContent.replace(/(<div[^>]*>)\s*<\/a>/gi, '$1');
    htmlContent = htmlContent.replace(/(<div[^>]*>)\s*<\/b>/gi, '$1');
    htmlContent = htmlContent.replace(/<a[^>]*>\s*<\/div>/g, '<\/div>');
    htmlContent = htmlContent.replace(/<b[^>]*>\s*<\/div>/g, '<\/div>');

    htmlContent = htmlContent.replace(/<h1[^>]*>/gi, '').replace(/<\/h1>/gi, '');
    htmlContent = htmlContent.replace(/<h2[^>]*>/gi, '').replace(/<\/h2>/gi, '');
    htmlContent = htmlContent.replace(/<h3[^>]*>/gi, '').replace(/<\/h3>/gi, '');
    htmlContent = htmlContent.replace(/<h4[^>]*>/gi, '').replace(/<\/h4>/gi, '');
    htmlContent = htmlContent.replace(/<h5[^>]*>/gi, '').replace(/<\/h5>/gi, '');
    htmlContent = htmlContent.replace(/<h6[^>]*>/gi, '').replace(/<\/h6>/gi, '');
    htmlContent = htmlContent.replace(/<br><br>\s*<br><br>/g, '<br><br>');
    htmlContent = htmlContent.replace(/<br><br>\s*<\/div>/g, '<\/div>');
    htmlContent = htmlContent.replace(/(<div[^>]*>)\s*<br><br>/gi, '$1');
    htmlContent = htmlContent.replace(/(<div[^>]*>)\s*<br><br>/gi, '$1');
    htmlContent = htmlContent.replace(/<br><br>\s*<\/div>/g, '<\/div>');
    htmlContent = htmlContent.replace(/(<div[^>]*>)\s*<br><br>/gi, '$1');
    htmlContent = htmlContent.replace(/<br><br>\s*<\/div>/g, '<\/div>');
    htmlContent = htmlContent.replace(/<br>\s*<\/div>/g, '<\/div>');
    htmlContent = htmlContent.replace(/<br>\s*<\/div>/g, '<\/div>');

    htmlContent = htmlContent.replace(/<div[^>]*>\s*<\/div>/g, '');
    htmlContent = htmlContent.replace(/<div[^>]*>\s*<\/div>/g, '');
    htmlContent = htmlContent.replace(/<td[^>]*>\s*<\/td>/g, '');
    htmlContent = htmlContent.replace(/<tr[^>]*>\s*<\/tr>/g, '');
    return htmlContent;
}

//end main js code

//html js code
function wrapContentInFullTableStructure(htmlContent) {
    const fullTableStructure = `
    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 100%;">
        <tr>
            <td align="center" valign="top">
                <table class="primary-table-wrapper" bgcolor="#FFFFFF" border="0" cellpadding="0" cellspacing="0"
                       role="presentation" width="100%" style="max-width: 600px;">
                    <tr>
                        <td class="content-space-main-wrapper" align="center" style="padding-top: 14px; padding-left: 19px; padding-bottom: 14px; padding-right: 19px;">
                            <table class="content-inner-table" border="0" cellspacing="0" role="presentation"
                                   cellpadding="0" width="100%" style="width: 100%;">
                                ${htmlContent}
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>`;
    return fullTableStructure;
}

//one br logic new
function preserveSingleBr(htmlContent) {
    htmlContent = htmlContent.replace(
        /<div[^>]*>\s*<br\s*\/?>\s*<\/div>/gi,
        'ю'
    );

    htmlContent = htmlContent.replace(
        /<span[^>]*>\s*<br\s*\/?>\s*<\/span>/gi,
        'ю'
    );

    return htmlContent;
}
//one br logic end
//one br old start
function addOneBr(htmlContent) {
    return htmlContent.replace(/ю/gi, function (match, content) {
        return `
                    <br>
        `;
    });
}

async function exportHTML() {
    window.currentImgIdx = 1;
    let editorContent = document.getElementById('editor').innerHTML;
    editorContent = preserveSingleBr(editorContent);
    editorContent = italicLinks(editorContent);
    editorContent = linksStyles(editorContent);
    editorContent = replaceAllEmojisAndSymbolsExcludingHTML(editorContent);
    editorContent = processStyles(editorContent);
    editorContent = wrapCenterTextHtml(editorContent);
    editorContent = wrapSmallCenterTextHtml(editorContent);
    editorContent = wrapSmallTextHtml(editorContent);
    editorContent = wrapCenterHeadlineHtml(editorContent);
    editorContent = wrapHeadlineHtml(editorContent);
    editorContent = wrapButtonHtml(editorContent);
    editorContent = wrapCenterQuoteHtml(editorContent);
    editorContent = wrapQuoteHtml(editorContent);
    editorContent = addBrAfterClosingP(editorContent);
    editorContent = removeStylesFromLists(editorContent);
    editorContent = wrapTextInSpan(editorContent);
    editorContent = wrapRightSideImg(editorContent);
    editorContent = wrapLeftSideImg(editorContent);
    editorContent = wrapSignatureImg(editorContent);
    editorContent = wrapFooterBlock(editorContent);
    editorContent = wrapFooterCenterBlock(editorContent);
    editorContent = cleanEmptyHtmlTags(editorContent);
    editorContent = wrapContentInFullTableStructure(editorContent);

    editorContent = addOneBr(editorContent);
    editorContent = replaceTripleBrWithSingle(editorContent);

    const prettyHtml = await formatWithPrettier(editorContent);
    document.getElementById('output').value = prettyHtml;
    return prettyHtml;
}


function downloadFile(content) {
    const fileName = document.getElementById('fileName').value.replace(/\s+/g, '').toUpperCase();

    const htmlContent = `${content}`;

    const file = new Blob([htmlContent], {type: 'text/html'});

    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = `${fileName}_html.html`;
    a.click();
    URL.revokeObjectURL(a.href);
}

/*-----File name update-----*/
function changeNumber(amount) {
    let input = document.getElementById("fileName");
    let match = input.value.match(/(\D*)(\d+)/); // Match text and number separately

    if (match) {
        let textPart = match[1]; // Non-numeric part (e.g., "SBJC ")
        let numberPart = parseInt(match[2]) || 0; // Numeric part (e.g., 123)
        numberPart += amount; // Increment or decrement the number
        input.value = textPart + numberPart; // Update input value
    }
}

/*-----File name update end-----*/

/*---update-script-for-image-start---*/
async function toJpeg600(blob, bgColor = '#ffffff') {
    const bmp = await createImageBitmap(blob)
    const naturalW = bmp.width
    const naturalH = bmp.height
    const targetW = Math.min(600, naturalW)
    const targetH = Math.round(naturalH * (targetW / naturalW))

    const canvas = document.createElement('canvas')
    canvas.width = targetW
    canvas.height = targetH
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, targetW, targetH)
    ctx.drawImage(bmp, 0, 0, targetW, targetH)

    const quality = 0.82
    const outBlob = await new Promise(resolve =>
        canvas.toBlob(resolve, 'image/jpeg', quality)
    )

    return outBlob
}

async function getBlobFromSrc(src) {
    try {
        const response = await fetch(src)
        return await response.blob()
    } catch (e) {
        console.error('Помилка завантаження зображення:', src)
        return null
    }
}

const logEl = document.getElementById('log')

function log(message) {
    logEl.innerHTML += message + '<br>'
    logEl.scrollTop = logEl.scrollHeight
}

async function downloadImages() {
    logEl.innerHTML = ''

    const imgs = Array.from(document.querySelectorAll('#editor img'))
    if (!imgs.length) {
        log('Немає <img> у редакторі.')
        return
    }

    const rawName = document.getElementById('fileName').value || 'PROMO'
    const promoName = rawName.replace(/\s+/g, '').toUpperCase()

    log(`Знайдено зображень: ${imgs.length}`)
    log(`Назва промо: ${promoName}`)
    log('--- Починаємо оптимізацію ---')

    let index = 1
    let saved = 0

    for (const img of imgs) {
        const src = img.getAttribute('src')
        if (!src) continue

        log(`Обробка img-${index}...`)

        const blob = await getBlobFromSrc(src)
        if (!blob) {
            log(`❌ Помилка завантаження: ${src}`)
            continue
        }

        const optimizedBlob = await toJpeg600(blob)

        const fileName = `${promoName}_img-${index}.jpg`

        if (typeof saveAs !== 'undefined') {
            saveAs(optimizedBlob, fileName)
        } else {
            const link = document.createElement('a')
            link.href = URL.createObjectURL(optimizedBlob)
            link.download = fileName
            link.click()
            setTimeout(() => URL.revokeObjectURL(link.href), 1000)
        }

        log(`✅ Збережено: ${fileName}`)

        index++
        saved++

        await new Promise(resolve => setTimeout(resolve, 300))
    }

    if (saved === 0) {
        log('Немає зображень для збереження.')
    } else {
        log('---')
        log(`✅ Done! Збережено ${saved} зображень`)
    }
}

async function downloadAll() {
    const btn = document.getElementById('downloadBtn')
    btn.disabled = true
    btn.textContent = 'Генеруємо HTML...'

    const prettyHtml = await exportHTML()

    btn.textContent = 'Оптимізуємо зображення...'
    await downloadImages()

    btn.textContent = 'Завантажуємо HTML...'

    // Використовуємо стару функцію
    downloadFile(prettyHtml)

    btn.textContent = 'Готово!'
    setTimeout(() => {
        btn.textContent = 'Завантажити HTML'
        btn.disabled = false
    }, 1500)
}

document.getElementById('downloadBtn').addEventListener('click', downloadAll)

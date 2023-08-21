var onfaceIconData = require('face-icon/lib/data.js')
var html = []
onfaceIconData.render(function (item) {
    if (item.type === 'classify') {
        html.push(`<h2>${item.name}</h2>`)
    }
    else {
        html.push(`
            <span class="icon" >
                <span class="fi fi-${item.name}" ></span>
                <span class="icon-text">${item.name}</span>
            </span>
        `)
        if (item.o) {
            html.push(`
                <span class="icon" >
                    <span class="fi fi-${item.name}-o" ></span>
                    <span class="icon-text">${item.name}-o</span>
                </span>
            `)
        }
        if (item.of) {
            html.push(`
                <span class="icon" >
                    <span class="fi fi-${item.name}-of" ></span>
                    <span class="icon-text">${item.name}-of</span>
                </span>
            `)
        }
        if (item.f) {
            html.push(`
                <span class="icon" >
                    <span class="fi fi-${item.name}-f" ></span>
                    <span class="icon-text">${item.name}-f</span>
                </span>
            `)
        }
        if (item.s) {
            html.push(`
                <span class="icon" >
                    <span class="fi fi-${item.name}-s" ></span>
                    <span class="icon-text">${item.name}-s</span>
                </span>
            `)
        }
        if (item.sf) {
            html.push(`
                <span class="icon" >
                    <span class="fi fi-${item.name}-sf" ></span>
                    <span class="icon-text">${item.name}-sf</span>
                </span>
            `)
        }
    }
})
html
document.getElementById('basic-demo').innerHTML = html.join('')

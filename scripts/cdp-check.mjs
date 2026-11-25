import { writeFileSync } from 'node:fs'

const [, , url = 'http://localhost:5173', widthArg = '390', heightArg = '844', output] =
  process.argv
const width = Number(widthArg)
const height = Number(heightArg)

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function main() {
  const targets = await fetch('http://127.0.0.1:9222/json/list').then((response) =>
    response.json(),
  )
  const page = targets.find((target) => target.type === 'page')
  if (!page) throw new Error('No page target found')

  const socket = new WebSocket(page.webSocketDebuggerUrl)
  const pending = new Map()
  let id = 0

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data)
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id)
      pending.delete(message.id)
      if (message.error) reject(new Error(JSON.stringify(message.error)))
      else resolve(message.result)
    }
  })

  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true })
    socket.addEventListener('error', reject, { once: true })
  })

  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const commandId = ++id
      pending.set(commandId, { resolve, reject })
      socket.send(JSON.stringify({ id: commandId, method, params }))
    })

  await send('Page.enable')
  await send('Runtime.enable')
  await send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 768,
    screenWidth: width,
    screenHeight: height,
  })
  await send('Page.navigate', { url })
  await sleep(4000)

  const expression = `(() => {
    const all = [...document.querySelectorAll('*')]
    const overflow = all
      .filter((element) => {
        const rect = element.getBoundingClientRect()
        return rect.right > window.innerWidth + 1 || rect.left < -1
      })
      .filter((element) => !element.closest('.marquee-track'))
      .slice(0, 30)
      .map((element) => {
        const rect = element.getBoundingClientRect()
        return {
          tag: element.tagName,
          cls: String(element.className).slice(0, 120),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
        }
      })
    return {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      scrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      overflow,
    }
  })()`

  const result = await send('Runtime.evaluate', {
    expression,
    returnByValue: true,
  })

  if (output) {
    const metrics = await send('Page.getLayoutMetrics')
    const contentSize = metrics.cssContentSize
    const screenshot = await send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
      clip: {
        x: 0,
        y: 0,
        width: contentSize.width,
        height: contentSize.height,
        scale: 1,
      },
    })
    writeFileSync(output, Buffer.from(screenshot.data, 'base64'))
    console.log(`Screenshot saved to ${output}`)
  }

  console.log(JSON.stringify(result.result.value, null, 2))
  socket.close()
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

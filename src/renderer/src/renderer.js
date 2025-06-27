let billSites = JSON.parse(localStorage.getItem('billSites') || '[]');
let currentEditingId = null;
let currentActiveId = null;
let collapsedCategories = JSON.parse(localStorage.getItem('collapsedCategories') || '[]');

const colors = [
  '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b',
  '#eb4d4b', '#6c5ce7', '#a29bfe', '#fd79a8', '#00b894',
  '#00cec9', '#0984e3', '#fdcb6e', '#e17055', '#d63031'
];

const categories = {
  'insurance': { name: 'Insurance', icon: '🛡️' },
  'utilities': { name: 'Utilities', icon: '⚡' },
  'credit-cards': { name: 'Credit Cards', icon: '💳' },
  'loans': { name: 'Loans & Mortgages', icon: '🏠' },
  'subscriptions': { name: 'Subscriptions', icon: '📺' },
  'healthcare': { name: 'Healthcare', icon: '🏥' },
  'government': { name: 'Government', icon: '🏛️' },
  'other': { name: 'Other', icon: '📋' }
};

function init() {
  window.addEventListener('DOMContentLoaded', () => {
    doAThing()
    setupSidebarToggle()
    setupBillPayFunctionality()
    renderBillSites()
  })
}

function setupSidebarToggle() {
  const sidebar = document.getElementById('sidebar')
  const toggleBtn = document.getElementById('sidebar-toggle')
  if (sidebar && toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed')
    })
  }
}

function setupBillPayFunctionality() {
  const addSiteBtn = document.getElementById('add-site-btn')
  const configForm = document.getElementById('config-form')
  const welcomeScreen = document.getElementById('welcome-screen')
  const siteForm = document.getElementById('site-form')
  const cancelBtn = document.getElementById('cancel-form')
  const paymentView = document.getElementById('bill-payment-view')
  const closePaymentBtn = document.getElementById('close-payment-view')
  const refreshPaymentBtn = document.getElementById('refresh-payment-view')
  const deleteSiteBtn = document.getElementById('delete-site-btn')
  const formTitle = document.getElementById('form-title')
  const saveBtn = document.getElementById('save-btn')

  addSiteBtn?.addEventListener('click', () => {
    showConfigForm()
  })

  cancelBtn?.addEventListener('click', () => {
    hideConfigForm()
  })

  siteForm?.addEventListener('submit', (e) => {
    e.preventDefault()
    const siteName = document.getElementById('site-name')?.value
    const siteUrl = document.getElementById('site-url')?.value
    const siteCategory = document.getElementById('site-category')?.value

    if (siteName && siteUrl && siteCategory) {
      if (currentEditingId) {
        const siteIndex = billSites.findIndex(site => site.id === currentEditingId)
        if (siteIndex !== -1) {
          billSites[siteIndex].name = siteName
          billSites[siteIndex].url = siteUrl
          billSites[siteIndex].category = siteCategory
        }
        currentEditingId = null
      } else {
        const newSite = {
          id: Date.now().toString(),
          name: siteName,
          url: siteUrl,
          category: siteCategory,
          color: colors[billSites.length % colors.length]
        }
        billSites.push(newSite)
      }

      localStorage.setItem('billSites', JSON.stringify(billSites))
      renderBillSites()
      hideConfigForm()
    }
  })

  deleteSiteBtn?.addEventListener('click', () => {
    if (currentEditingId && confirm('Are you sure you want to delete this site?')) {
      billSites = billSites.filter(site => site.id !== currentEditingId)
      localStorage.setItem('billSites', JSON.stringify(billSites))
      
      if (currentActiveId === currentEditingId) {
        currentActiveId = null
        paymentView?.classList.add('hidden')
        if (billSites.length === 0) {
          welcomeScreen?.classList.remove('hidden')
        }
      }
      
      currentEditingId = null
      renderBillSites()
      hideConfigForm()
    }
  })

  // Close payment view
  closePaymentBtn?.addEventListener('click', () => {
    currentActiveId = null
    paymentView?.classList.add('hidden')
    configForm?.classList.add('hidden')
    welcomeScreen?.classList.remove('hidden')
    
    const webview = document.getElementById('payment-webview')
    if (webview) {
      webview.src = 'about:blank'
    }
    
    document.querySelectorAll('.bill-site-btn').forEach(btn => {
      btn.classList.remove('active')
    })
  })

  refreshPaymentBtn?.addEventListener('click', () => {
    const webview = document.getElementById('payment-webview')
    if (webview && currentActiveId) {
      const currentSite = billSites.find(site => site.id === currentActiveId)
      if (currentSite) {
        webview.src = 'about:blank'
        setTimeout(() => {
          webview.src = currentSite.url
        }, 100)
      }
    }
  })
}

function showConfigForm(site = null) {
  const configForm = document.getElementById('config-form')
  const welcomeScreen = document.getElementById('welcome-screen')
  const paymentView = document.getElementById('bill-payment-view')
  const formTitle = document.getElementById('form-title')
  const saveBtn = document.getElementById('save-btn')
  const deleteSiteBtn = document.getElementById('delete-site-btn')
  const siteNameInput = document.getElementById('site-name')
  const siteUrlInput = document.getElementById('site-url')
  const siteCategorySelect = document.getElementById('site-category')
  const siteForm = document.getElementById('site-form')

  welcomeScreen?.classList.add('hidden')
  paymentView?.classList.add('hidden')
  configForm?.classList.remove('hidden')

  if (site) {
    currentEditingId = site.id
    formTitle.textContent = 'Edit Bill Payment Site'
    saveBtn.textContent = 'Update'
    deleteSiteBtn?.classList.remove('hidden')
    siteNameInput.value = site.name
    siteUrlInput.value = site.url
    siteCategorySelect.value = site.category || 'other'
  } else {
    currentEditingId = null
    formTitle.textContent = 'Add Bill Payment Site'
    saveBtn.textContent = 'Save'
    deleteSiteBtn?.classList.add('hidden')
    siteForm?.reset()
  }
}

function hideConfigForm() {
  const configForm = document.getElementById('config-form')
  const welcomeScreen = document.getElementById('welcome-screen')
  const paymentView = document.getElementById('bill-payment-view')
  const siteForm = document.getElementById('site-form')

  configForm?.classList.add('hidden')
  
  if (!currentActiveId || paymentView?.classList.contains('hidden')) {
    welcomeScreen?.classList.remove('hidden')
  }
  
  siteForm?.reset()
  currentEditingId = null
}

function renderBillSites() {
  const billSitesContainer = document.getElementById('bill-sites')
  if (!billSitesContainer) return

  billSitesContainer.innerHTML = ''

  const sitesByCategory = {}
  billSites.forEach(site => {
    const category = site.category || 'other'
    if (!sitesByCategory[category]) {
      sitesByCategory[category] = []
    }
    sitesByCategory[category].push(site)
  })

  Object.keys(categories).forEach(categoryKey => {
    const sitesInCategory = sitesByCategory[categoryKey]
    if (!sitesInCategory || sitesInCategory.length === 0) return

    const categorySection = document.createElement('div')
    categorySection.className = 'category-section'
    categorySection.dataset.category = categoryKey
    
    if (collapsedCategories.includes(categoryKey)) {
      categorySection.classList.add('collapsed')
    }

    const categoryHeader = document.createElement('div')
    categoryHeader.className = 'category-header'
    categoryHeader.innerHTML = `
      <h4 class="category-title">
        <span class="category-icon">${categories[categoryKey].icon}</span>
        <span class="category-name">${categories[categoryKey].name}</span>
      </h4>
      <span class="category-toggle">▼</span>
    `

    categoryHeader.addEventListener('click', () => {
      toggleCategory(categoryKey)
    })

    const categorySites = document.createElement('div')
    categorySites.className = 'category-sites'

    sitesInCategory.forEach(site => {
      const button = document.createElement('button')
      button.className = 'bill-site-btn'
      button.style.setProperty('--site-color', site.color)
      button.dataset.siteId = site.id
      
      if (currentActiveId === site.id) {
        button.classList.add('active')
      }
      
      button.innerHTML = `
        <span class="site-name">${site.name}</span>
        <button class="edit-btn" title="Edit site">✎</button>
      `
      
      button.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-btn')) {
          return
        }
        loadBillSite(site)
      })
      
      const editBtn = button.querySelector('.edit-btn')
      editBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        e.preventDefault()
        showConfigForm(site)
      })

      categorySites.appendChild(button)
    })

    categorySection.appendChild(categoryHeader)
    categorySection.appendChild(categorySites)
    billSitesContainer.appendChild(categorySection)
  })

  const welcomeScreen = document.getElementById('welcome-screen')
  const paymentView = document.getElementById('bill-payment-view')
  const configForm = document.getElementById('config-form')
  
  if (!currentActiveId && paymentView?.classList.contains('hidden') && configForm?.classList.contains('hidden')) {
    welcomeScreen?.classList.remove('hidden')
  }
}

function toggleCategory(categoryKey) {
  const categorySection = document.querySelector(`[data-category="${categoryKey}"]`)
  if (!categorySection) return

  categorySection.classList.toggle('collapsed')
  
  // Update collapsed categories in storage
  if (categorySection.classList.contains('collapsed')) {
    if (!collapsedCategories.includes(categoryKey)) {
      collapsedCategories.push(categoryKey)
    }
  } else {
    collapsedCategories = collapsedCategories.filter(cat => cat !== categoryKey)
  }
  
  localStorage.setItem('collapsedCategories', JSON.stringify(collapsedCategories))
}

function loadBillSite(site) {
  const paymentView = document.getElementById('bill-payment-view')
  const configForm = document.getElementById('config-form')
  const welcomeScreen = document.getElementById('welcome-screen')
  const currentSiteName = document.getElementById('current-site-name')
  const webview = document.getElementById('payment-webview')

  // If clicking the same site that's already active, return to welcome screen
  if (currentActiveId === site.id && !paymentView?.classList.contains('hidden')) {
    currentActiveId = null
    paymentView?.classList.add('hidden')
    configForm?.classList.add('hidden')
    welcomeScreen?.classList.remove('hidden')
    
    // Clear the webview
    if (webview) {
      webview.src = 'about:blank'
    }
    
    // Remove active state from all buttons
    document.querySelectorAll('.bill-site-btn').forEach(btn => {
      btn.classList.remove('active')
    })
    return
  }

  // Set current active site
  currentActiveId = site.id

  // Hide other views and show payment view
  configForm?.classList.add('hidden')
  welcomeScreen?.classList.add('hidden')
  paymentView?.classList.remove('hidden')
  
  // Update site name
  if (currentSiteName) {
    currentSiteName.textContent = site.name
  }
  
  // Clear and load the new site in webview
  if (webview) {
    // First clear the webview to prevent showing previous content
    webview.src = 'about:blank'
    
    // Use a small delay to ensure the webview is cleared before loading new content
    setTimeout(() => {
      webview.src = site.url
      setupWebviewHandlers(webview)
    }, 100)
  }

  // Update button states
  renderBillSites()
}

function setupWebviewHandlers(webview) {
  // Remove existing listeners to avoid duplicates
  webview.removeEventListener('new-window', handleNewWindow)
  webview.removeEventListener('will-navigate', handleWillNavigate)
  
  // Prevent new windows/tabs from opening
  webview.addEventListener('new-window', handleNewWindow)
  
  // Handle navigation within the same webview
  webview.addEventListener('will-navigate', handleWillNavigate)
}

function handleNewWindow(event) {
  // Prevent new windows and navigate in the same webview instead
  event.preventDefault()
  const webview = document.getElementById('payment-webview')
  if (webview && event.url) {
    webview.src = event.url
  }
}

function handleWillNavigate(event) {
  // Allow navigation within the same webview
  console.log('Navigating to:', event.url)
}

function doAThing() {
  const versions = window.electron.process.versions
  replaceText('.electron-version', `Electron v${versions.electron}`)
  replaceText('.chrome-version', `Chromium v${versions.chrome}`)
  replaceText('.node-version', `Node v${versions.node}`)

  const ipcHandlerBtn = document.getElementById('ipcHandler')
  ipcHandlerBtn?.addEventListener('click', () => {
    window.electron.ipcRenderer.send('ping')
  })
}

function replaceText(selector, text) {
  const element = document.querySelector(selector)
  if (element) {
    element.innerText = text
  }
}

init()

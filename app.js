// Application Data
const appData = {
  marketData: {
    globalVCMarket2024: 337.40,
    globalVCMarketProjected2033: 1458.78,
    privateMarketsAUM: 14.3,
    privateEquityAUM: 9.4,
    q1_2025_VC_funding: 126.3
  },
  startupHubRankings2025: [
    {"rank": 1, "city": "San Francisco", "country": "United States", "growth": "19.9%"},
    {"rank": 2, "city": "New York", "country": "United States", "growth": "25.5%"},
    {"rank": 3, "city": "London", "country": "United Kingdom", "growth": "29.8%"},
    {"rank": 4, "city": "Los Angeles", "country": "United States", "growth": "14.1%"},
    {"rank": 5, "city": "Beijing", "country": "China", "growth": "25.2%"},
    {"rank": 6, "city": "Boston", "country": "United States", "growth": "17.1%"},
    {"rank": 7, "city": "Shanghai", "country": "China", "growth": "38.4%"},
    {"rank": 8, "city": "Paris", "country": "France", "growth": "34.6%"},
    {"rank": 9, "city": "Tel Aviv", "country": "Israel", "growth": "24.0%"},
    {"rank": 10, "city": "Bangalore", "country": "India", "growth": "13.8%"}
  ],
  unicornData: {
    "USA": 758,
    "China": 343,
    "India": 64,
    "UK": 61,
    "Germany": 36,
    "totalGlobal": 1523,
    "totalValue": "5.6 trillion"
  },
  indiaStartupData: {
    "totalRecognized": 159157,
    "projectedBy2030": 240000,
    "directJobs": 1720000,
    "womenLedStartups": 75935,
    "unicorns": 64
  },
  performanceData: {
    "peIndex_H1_2024": 3.4,
    "vcIndex_H1_2024": 1.4,
    "pe_10year_IRR": 15.8,
    "publicMarkets_10year": 6.2,
    "pe_5year_IRR": 11.8,
    "publicMarkets_5year": 4.8
  },
  lpAllocationData: {
    "institutionsAlternatives": 23,
    "statePensionsAlternatives": 40,
    "privateEquityAllocation": 14.85,
    "privateCreditAllocation": 3.69,
    "realAssetsAllocation": 24
  },
  fundStructure: {
    "managementFee": 2,
    "carriedInterest": 20,
    "fundDuration": "8-10 years",
    "jCurvePhases": ["Investment Period (Years 1-3)", "Value Creation (Years 4-6)", "Harvest Period (Years 7-10)"]
  },
  dealMetrics: {
    "averageHoldingPeriod": 8,
    "startupIRR": 30,
    "dealPipelineAcceptance": 30
  },
  sectors: {
    "topVCSecrors": ["Technology", "Biotech", "Software", "AI/ML", "Fintech", "Healthcare"],
    "aiInvestment2024": 131.5,
    "softwareShare": 35,
    "biotechShare": 22
  },
  assetAllocation: {
    pensionFunds: {
      equity: 52,
      fixedIncome: 28,
      alternatives: 19,
      cash: 1
    },
    hni: {
      equity: 35,
      fixedIncome: 30,
      alternatives: 14,
      cash: 13
    },
    bankInsurance: {
      equity: 20,
      fixedIncome: 63,
      alternatives: 11,
      cash: 6
    }
  }

};

// Chart variables
let performanceChart = null;
let jCurveChart = null;
let allocationChart = null;
let pensionChart = null;
let hniChart = null;
let comparisionChart = null;
let bankChart = null;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeLifecycleStages();
  initializeIndexNavigation();
  initializeStructureTabs();
  initializeCounters();
  initializeTimeSelector();

  // Initialize the performance chart ONLY if its section is active on load
  if (document.getElementById('performance').classList.contains('active')) {
      initializePerformanceChart();
  }
  
  // Initialize asset allocation charts if the asset-allocation section is initially active
  if (document.getElementById('asset-allocation').classList.contains('active')) {
    initializeAssetAllocationCharts();
  }
  // Initialize J-Curve chart ONLY if its section is active on load
  if (document.getElementById('metrics').classList.contains('active')) {
      initializeJCurveChart();
      initializeAllocationChart(); // Assuming this is also in the metrics section
  }

});

// Navigation functionality
function initializeNavigation() {
  const navTabs = document.querySelectorAll('.nav-tab');
  const contentSections = document.querySelectorAll('.content-section');

  navTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetSection = this.getAttribute('data-section');
      
      // Update active tab
      navTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // Update active section
      contentSections.forEach(section => {
        section.classList.remove('active');
      });
      
      const targetElement = document.getElementById(targetSection);
      if (targetElement) {
        targetElement.classList.add('active');

         // **IMPORTANT: Initialize charts here when the section becomes active**
          if (targetSection === 'performance' && !performanceChart) {
              initializePerformanceChart();
          } else if (targetSection === 'asset-allocation') {
              // Ensure all asset allocation charts are initialized
              initializeAssetAllocationCharts();
          } else if (targetSection === 'metrics') {
              // Ensure metrics section charts are initialized
              if (!jCurveChart) initializeJCurveChart();
              if (!allocationChart) initializeAllocationChart(); // if you intend to use this chart
          }
      }
    });
  });
}

// Lifecycle stages interaction
function initializeLifecycleStages() {
  const lifecycleStages = document.querySelectorAll('.lifecycle-stage');
  
  lifecycleStages.forEach(stage => {
    stage.addEventListener('click', function() {
      // Remove active class from all stages
      lifecycleStages.forEach(s => s.classList.remove('active-stage'));
      
      // Add active class to clicked stage
      this.classList.add('active-stage');
      
      // Toggle stage details
      const details = this.querySelector('.stage-details');
      const allDetails = document.querySelectorAll('.stage-details');
      
      allDetails.forEach(detail => {
        if (detail !== details) {
          detail.classList.add('hidden');
        }
      });
      
      if (details) {
        details.classList.toggle('hidden');
      }
    });
  });
}

// Structure tabs functionality
function initializeStructureTabs() {
  const structureTabs = document.querySelectorAll('.structure-tab');
  const structurePanels = document.querySelectorAll('.structure-panel');
  
  structureTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetCountry = this.getAttribute('data-country');
      
      // Update active tab
      structureTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // Update active panel
      structurePanels.forEach(panel => {
        panel.classList.remove('active');
      });
      
      const targetPanel = document.getElementById(`${targetCountry}-structure`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

// Performance chart
function initializePerformanceChart() {
  if (performanceChart) return;
  const ctx = document.getElementById('performanceChart');
  if (!ctx) return;

  const chartData = {
    '5yr': {
      labels: ['Private Equity', 'Public Markets', 'Venture Capital', 'Real Estate', 'Bonds', 'Hedge Funds'],
      data: [11.8, 4.8, 18.2, 8.5, 3.2, 7.8]
    },
    '10yr': {
      labels: ['Private Equity', 'Public Markets', 'Venture Capital', 'Real Estate', 'Bonds', 'Hedge Funds'],
      data: [15.8, 6.2, 25.4, 10.2, 4.1, 9.3]
    },
    'h1-2024': {
      labels: ['Private Equity', 'Public Markets', 'Venture Capital', 'Real Estate', 'Bonds', 'Hedge Funds'],
      data: [3.4, 2.8, 1.4, 2.1, 1.8, 2.5]
    }
  };

  performanceChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartData['5yr'].labels,
      datasets: [{
        label: 'Returns (%)',
        data: chartData['5yr'].data,
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'],
        borderColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: '5-Year Performance Comparison'
        },
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Returns (%)'
          }
        }
      }
    }
  });

  // Store chart data for time selector
  performanceChart.chartData = chartData;
}

// Time selector functionality
function initializeTimeSelector() {
  const timeButtons = document.querySelectorAll('.time-btn');
  
  timeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const period = this.getAttribute('data-period');
      
      // Update active button
      timeButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Update chart data
      if (performanceChart && performanceChart.chartData) {
        const newData = performanceChart.chartData[period];
        performanceChart.data.labels = newData.labels;
        performanceChart.data.datasets[0].data = newData.data;
        
        // Update chart title
        let title = '';
        switch(period) {
          case '5yr': title = '5-Year Performance Comparison'; break;
          case '10yr': title = '10-Year Performance Comparison'; break;
          case 'h1-2024': title = 'H1 2024 Performance Comparison'; break;
        }
        performanceChart.options.plugins.title.text = title;
        
        performanceChart.update();
      }
    });
  });
}

function initializeIndexNavigation() {
  console.log('Initializing index navigation...');
  const indexLinks = document.querySelectorAll('.index-link, .quick-btn');
 
  indexLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetSection = this.getAttribute('data-section');
      console.log('Index link clicked:', targetSection);
      if (targetSection) {
        navigateToSection(targetSection);
      }
    });
  });
}


function navigateToSection(targetSection) {
  console.log('Navigating to section:', targetSection);
 
  const navTabs = document.querySelectorAll('.nav-tab');
  const contentSections = document.querySelectorAll('.content-section');
 
  // Update active tab
  navTabs.forEach(tab => {
    tab.classList.remove('active');
    if (tab.getAttribute('data-section') === targetSection) {
      tab.classList.add('active');
      console.log('Activated tab for:', targetSection);
    }
  });
 
  // Update active section
  contentSections.forEach(section => {
    section.classList.remove('active');
    if (section.id === targetSection) {
      section.classList.add('active');
      console.log('Activated section:', targetSection);
    }
  });
 
  // Initialize charts when asset allocation section is shown
  if (targetSection === 'asset-allocation') {
    setTimeout(() => {
      initializeAssetAllocationCharts();
    }, 200);
  }
 
  // Scroll to top of content
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initializeAssetAllocationCharts() {
  console.log('Initializing asset allocation charts...');
  initializePensionChart();
  initializeHNIChart();
  initializeBankChart();
  initializeComparisonChart();
}


function initializePensionChart() {
  const ctx = document.getElementById('pensionChart');
  if (!ctx) {
    console.log('Pension chart canvas not found');
    return;
  }
 
  if (pensionChart) {
    pensionChart.destroy();
  }


  pensionChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Equity', 'Fixed Income', 'Alternatives', 'Cash'],
      datasets: [{
        data: [
          appData.assetAllocation.pensionFunds.equity,
          appData.assetAllocation.pensionFunds.fixedIncome,
          appData.assetAllocation.pensionFunds.alternatives,
          appData.assetAllocation.pensionFunds.cash
        ],
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'],
        borderColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Pension Funds Asset Allocation'
        },
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 10
          }
        }
      }
    }
  });
  console.log('Pension chart initialized');
}


function initializeHNIChart() {
  const ctx = document.getElementById('hniChart');
  if (!ctx) {
    console.log('HNI chart canvas not found');
    return;
  }
 
  if (hniChart) {
    hniChart.destroy();
  }


  hniChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Equity', 'Fixed Income', 'Alternatives', 'Cash'],
      datasets: [{
        data: [
          appData.assetAllocation.hni.equity,
          appData.assetAllocation.hni.fixedIncome,
          appData.assetAllocation.hni.alternatives,
          appData.assetAllocation.hni.cash
        ],
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'],
        borderColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'HNI Asset Allocation'
        },
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 10
          }
        }
      }
    }
  });
  console.log('HNI chart initialized');
}


function initializeBankChart() {
  const ctx = document.getElementById('bankChart');
  if (!ctx) {
    console.log('Bank chart canvas not found');
    return;
  }
 
  if (bankChart) {
    bankChart.destroy();
  }


  bankChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Equity', 'Fixed Income', 'Alternatives', 'Cash'],
      datasets: [{
        data: [
          appData.assetAllocation.bankInsurance.equity,
          appData.assetAllocation.bankInsurance.fixedIncome,
          appData.assetAllocation.bankInsurance.alternatives,
          appData.assetAllocation.bankInsurance.cash
        ],
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'],
        borderColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Bank/Insurance Asset Allocation'
        },
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 10
          }
        }
      }
    }
  });
  console.log('Bank chart initialized');
}


function initializeComparisonChart() {
  if (comparisionChart) return;
  const ctx = document.getElementById('comparisonChart');
  if (!ctx) return;


  comparisonChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Equity', 'Fixed Income', 'Alternatives', 'Cash'],
      datasets: [
        {
          label: 'Pension Funds',
          data: [
            appData.assetAllocation.pensionFunds.equity,
            appData.assetAllocation.pensionFunds.fixedIncome,
            appData.assetAllocation.pensionFunds.alternatives,
            appData.assetAllocation.pensionFunds.cash
          ],
          backgroundColor: '#1FB8CD',
          borderColor: '#1FB8CD',
          borderWidth: 1
        },
        {
          label: 'HNI',
          data: [
            appData.assetAllocation.hni.equity,
            appData.assetAllocation.hni.fixedIncome,
            appData.assetAllocation.hni.alternatives,
            appData.assetAllocation.hni.cash
          ],
          backgroundColor: '#FFC185',
          borderColor: '#FFC185',
          borderWidth: 1
        },
        {
          label: 'Bank/Insurance',
          data: [
            appData.assetAllocation.bankInsurance.equity,
            appData.assetAllocation.bankInsurance.fixedIncome,
            appData.assetAllocation.bankInsurance.alternatives,
            appData.assetAllocation.bankInsurance.cash
          ],
          backgroundColor: '#B4413C',
          borderColor: '#B4413C',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Asset Allocation Comparison by LP Type'
        },
        legend: {
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 70,
          title: {
            display: true,
            text: 'Allocation (%)'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Asset Classes'
          }
        }
      }
    }
  });
  console.log('Comparison chart initialized');
}



// J-Curve chart
function initializeJCurveChart() {
  if (jCurveChart) return;
  const ctx = document.getElementById('jCurveChart');
  if (!ctx) return;

  jCurveChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10'],
      datasets: [{
        label: 'Cumulative Returns (%)',
        data: [-15, -25, -20, -10, 5, 20, 45, 80, 120, 180],
        borderColor: '#1FB8CD',
        backgroundColor: 'rgba(31, 184, 205, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#1FB8CD',
        pointBorderColor: '#1FB8CD',
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'J-Curve: Typical VC Fund Performance'
        },
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          title: {
            display: true,
            text: 'Cumulative Returns (%)'
          },
          grid: {
            color: 'rgba(0,0,0,0.1)'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Fund Age'
          },
          grid: {
            color: 'rgba(0,0,0,0.1)'
          }
        }
      },
      elements: {
        point: {
          hoverRadius: 6
        }
      }
    }
  });
}

// LP Allocation chart
function initializeAllocationChart() {
  if (allocationChart) return;
  const ctx = document.getElementById('allocationChart');
  if (!ctx) return;

  allocationChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Private Equity', 'Real Assets', 'Private Credit', 'Public Equity', 'Fixed Income', 'Other'],
      datasets: [{
        data: [14.85, 24, 3.69, 35, 18, 4.46],
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'],
        borderColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Typical LP Asset Allocation (%)'
        },
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 15
          }
        }
      }
    }
  });
}

// Counter animations
function initializeCounters() {
  const counters = document.querySelectorAll('.stat-card h3, #unicorn-counter');
  
  const animateCounter = (element, target, suffix = '') => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      if (suffix === 'T' || suffix === 'B') {
        element.textContent = '$' + current.toFixed(1) + suffix;
      } else if (target > 1000) {
        element.textContent = Math.floor(current).toLocaleString() + suffix;
      } else {
        element.textContent = current.toFixed(1) + suffix + (suffix ? '' : '');
      }
    }, 20);
  };

  // Animate counters when they come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const text = element.textContent;
        
        // Parse the target value
        let target = 0;
        let suffix = '';
        
        if (text.includes('$') && text.includes('T')) {
          target = parseFloat(text.replace('$', '').replace('T', ''));
          suffix = 'T';
        } else if (text.includes('$') && text.includes('B')) {
          target = parseFloat(text.replace('$', '').replace('B', ''));
          suffix = 'B';
        } else if (text.includes(',')) {
          target = parseInt(text.replace(/,/g, ''));
        } else {
          target = parseFloat(text);
        }
        
        if (target > 0) {
          animateCounter(element, target, suffix);
          observer.unobserve(element);
        }
      }
    });
  });

  counters.forEach(counter => {
    observer.observe(counter);
  });
}

// Utility functions
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Responsive chart handling
function handleChartResize() {
  if (performanceChart) performanceChart.resize();
  if (jCurveChart) jCurveChart.resize();
  if (allocationChart) allocationChart.resize();
}

// Add resize listener with debounce
window.addEventListener('resize', debounce(handleChartResize, 250));

// Smooth scrolling for internal navigation
document.addEventListener('click', function(e) {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
});

// Add loading states for charts
function showChartLoading(chartId) {
  const container = document.querySelector(`#${chartId}`).parentElement;
  container.style.position = 'relative';
  
  const loader = document.createElement('div');
  loader.className = 'chart-loader';
  loader.innerHTML = '<div class="loading-spinner"></div>';
  loader.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.8);
    z-index: 10;
  `;
  
  container.appendChild(loader);
  
  setTimeout(() => {
    if (loader.parentElement) {
      loader.remove();
    }
  }, 1000);
}

// Error handling for charts
window.addEventListener('error', function(e) {
  console.error('Chart error:', e);
  // Fallback for chart errors
  const chartContainers = document.querySelectorAll('.chart-container canvas');
  chartContainers.forEach(canvas => {
    if (!canvas.chart) {
      const fallback = document.createElement('div');
      fallback.textContent = 'Chart temporarily unavailable';
      fallback.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: var(--color-text-secondary);
        font-style: italic;
      `;
      canvas.parentElement.appendChild(fallback);
    }
  });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
  if (e.key === 'Tab') {
    // Ensure proper tab navigation
    document.body.classList.add('keyboard-navigation');
  }
});

document.addEventListener('mousedown', function() {
  document.body.classList.remove('keyboard-navigation');
});

// Performance optimization: Lazy load charts
const chartObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const chartId = entry.target.id;
      
      switch(chartId) {
        case 'performanceChart':
          if (!performanceChart) initializePerformanceChart();
          break;
        case 'jCurveChart':
          if (!jCurveChart) initializeJCurveChart();
          break;
        case 'allocationChart':
          if (!allocationChart) initializeAllocationChart();
          break;
      }
      
      chartObserver.unobserve(entry.target);
    }
  });
});

// Observe chart canvases for lazy loading
document.addEventListener('DOMContentLoaded', function() {
  const chartCanvases = document.querySelectorAll('.chart-container canvas');
  chartCanvases.forEach(canvas => {
    chartObserver.observe(canvas);
  });
});

// Add some interactive enhancements
function addInteractiveEnhancements() {
  // Add hover effects to cards
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.transition = 'transform 0.2s ease';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Add click effects to buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
  
  .keyboard-navigation *:focus {
    outline: 2px solid var(--color-primary) !important;
    outline-offset: 2px;
  }
  
  .loading-spinner {
    width: 24px;
    height: 24px;
    border: 2px solid var(--color-border);
    border-top: 2px solid var(--color-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

// Initialize interactive enhancements
document.addEventListener('DOMContentLoaded', addInteractiveEnhancements);
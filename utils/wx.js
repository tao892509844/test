/*
 * @Description: 
 * @Author: 似荆
 * @Date: 2020-10-30 22:24:16
 * @LastEditors: 似荆
 * @LastEditTime: 2023-11-12 17:13:08
 */
export function checkAndAuthorize (scope, tip, sync = true) {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success (res) {
        if (!res.authSetting[scope]) {
          wx.authorize({
            scope: scope,
            success () {
              resolve() // 无返回参数
            },
            fail (e) {
              if (!sync) {
                reject(new Error('未授权'))
              }
              modal({
                content: tip,
                showCancel: false,
                confirmText: '立即授权'
              }).then(() => {
                wx.openSetting({
                  success: function (setting) {
                    if (!sync) {
                      return;
                    }
                    if (setting.authSetting[scope]) {
                      resolve();
                    } else {
                      reject(new Error('未授权'));
                    }
                  }
                });
              });
            }
          });
        } else {
          resolve(); // 无返回参数
        }
      },
      fail (e) {
        reject(e);
      }
    });
  });
}

export const msg = (opts, that) => {
  uni.showToast({
    duration: 1500,
    mask: true,
    icon: 'none',
    ...opts
  }, that || this);
};

export const loading = {
  show (opts) {
    uni.showLoading({ mask: true, title: '正在加载中', ...opts });
  },
  hide () {
    uni.hideLoading();
  }
};

export const showModal = (opts) => {
  return new Promise((resolve, reject) => {
    uni.showModal({
      cancelColor: '#c7c7c7',
      confirmColor: '#fe710d',
      title: '提示',
      ...opts,
      success (res) {
        if (res.confirm) {
          resolve()
        } else if (res.cancel) {
          reject()
        }
      }
    });
  })
};

function getSystemInfoSync () {
  return uni.getSystemInfoSync()
}

function getMenuButtonBoundingClientRect () {
  return uni.getMenuButtonBoundingClientRect()
}

export function getNavInfo () {
  const info = {}
  const systemInfo = getSystemInfoSync()
  // 胶囊按钮位置信息
  const menuButtonInfo = getMenuButtonBoundingClientRect()
  // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
  info.navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight;
  info.menuRight = systemInfo.screenWidth - menuButtonInfo.right
  info.menuBottom = menuButtonInfo.top - systemInfo.statusBarHeight
  info.menuHeight = menuButtonInfo.height
  return info
}

export const prePage = () => {
  let pages = getCurrentPages();
  return pages[pages.length - 2];
}

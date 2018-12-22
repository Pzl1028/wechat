// pages/mine/size/mysize/mysize.js
  var app = getApp();
Page({
  // checkCustom:function(e){
  //   app.apirequest('/custom/findCustomByFlag','POST',{
  //     'memberId':wx.getStorageSync('memberId'),
  //     'flag':e.flag
  //   },function(res){
  //       var customList=res.data;      
  //   })
  // },
  /**
   * 页面的初始数据
   */
  data: {
     mysize:null,
    userimg:"/img/UpLoad.png"
  },
  
uploaduserimg:function(){
  var that=this;
  wx.chooseImage({
    success(res) {
      console.log(res)
      const tempFilePaths = res.tempFilePaths
      that.setData({
        userimg:res.tempFiles["0"].path
      })
      wx.uploadFile({
        url: '', // 仅为示例，非真实的接口地址
        filePath: tempFilePaths[0],
        name: 'file',
        formData: {
          user: 'test'
        },
        success(res) {
          const data = res.data
          // do something
        }
      })
    }
  })
},
 
  setCustom:function(e){
    console.log(e)
    wx.setStorageSync('selectCustom', e.currentTarget.dataset.custom.cus)
    wx.showToast({
      title: '选择量体信息成功',
      icon: 'none',
      duration: 2000
    })
    timer: setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 1500);
  }
,
  checkCustom: function (e) {

    var that = this;
    that.setData({
      Artificialinput_status: "shoudong"
    })

    //console.log(wx.getStorageSync('memberId'));
    wx.request({
      url: 'https://www.pengyoujuhui.com/clothing/custom/findCustomByFlag',
      method: "post",
      data: {
        'memberId': wx.getStorageSync('memberId'),
        'flag': 1
      },
      // post请求  需要加这个 application/x-www-form-urlencoded   GET不需要
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 200) {
          that.setData({
            mysize: res.data.data
          })
          console.log(that.data.mysize);
        }
      },
      fail: function (res) {

      }

    })
  },

  getCustom: function (e) {
    var that = this;
    that.setData({
      Artificialinput_status: "jiqi"
    })
    //console.log(wx.getStorageSync('memberId'));
    wx.request({
      url: 'https://www.pengyoujuhui.com/clothing/custom/findCustomByFlag',
      method: "post",
      data: {
        'memberId': wx.getStorageSync('memberId'),
        'flag': 0
      },
      // post请求  需要加这个 application/x-www-form-urlencoded   GET不需要
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 200) {
          that.setData({
            mysize: res.data.data
          })
          console.log(that.data.mysize);
        } else {
          that.setData({
            mysize: []
          })
        }
      },
      fail: function (res) {

      }

    })
  },

  delectmysize:function(e){
    console.log("id为："+e.currentTarget.dataset.size.id)
    wx.request({
      url:'https://www.pengyoujuhui.com/clothing/custom/deleteCustomById',
      method:'POST',
      data:{
        'id': e.currentTarget.dataset.size.id
        },
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success(res){
        console.log(JSON.stringify(res));
        if(res.data.code == 200){
          wx.setStorageSync('selectCustom', '')
          setTimeout(function(){
            wx.showToast({
              title: '删除成功!'
            })
          },1000)
          wx.redirectTo({
            url: '/pages/mine/size/mysize/mysize',
          })
        }else{
            wx.showToast({
              title: '删除失败！',
              icon: 'none'
            })
        }
      }
    })
  },
 
  AddMysize:function(e){
    console.log("我的尺寸")
    console.log(e.currentTarget.dataset.size);
    wx.navigateTo({
      url: '../../../home/toorder/toorder',
    })

  },

  UpDateMySize: function (e) {
    wx.setStorageSync('updataMySize', e.currentTarget.dataset.size)
    wx.navigateTo({
      url: '../../../home/updatetoorder/updatetoorder',
    })

  },

  robootscan:function(){
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
        if (res.result!=null){
          var custom_id =res.result.split("=");
          console.log(custom_id[1])
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.checkCustom();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
// pages/brand/brand.js
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */ 
  data: { 
    // imgUrls: [
    //   'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //   'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
    //   'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    // ], 
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    circular:true,
    duration: 1000,
    selected: true,
    selected1: false,
    selected2:false,
    classification:{},
    style:{},
    shop:{},
    banner:{}
  },
  selected: function (e) {
    this.setData({
      selected: true,
      selected1: false ,
      selected2:false
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true,
      selected2:false
    })
  },
  selected2: function (e) {
    this.setData({
      selected: false,
      selected1: false,
      selected2: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this
      // 按类目
    app.apiRequest('/product/getProductType','POST',{
    },function(res){
      console.log(res.code)
      console.log(res.data)
      that.setData({
        classification:res.data
      })
    });
    // 按风格
    app.apiRequest('/product/getProductStyle', 'GET', {
    }, function (res) {
      console.log(res.code)
      console.log(res.data)
      that.setData({
        style: res.data
      })
    });
    // 分类banner
    app.apiRequest('/banner/getTypeBanner', 'GET', {
      'state':1
    }, function (res) {
      console.log(res.code)
      console.log(res.data)
      that.setData({
        banner: res.data
      })
    });
  },
  jinru:function(){
    var that = this
    var type_id = that.data.id
    app.apiRequest('/product/getProduct','GET',{
      'typeId': type_id
    },function(resa){
      
    })
  },
  jinrua: function () {
    var that = this
    var id = that.data.id
    app.apiRequest('/product/getProduct', 'GET', {
      'typeId':id
    }, function (resa) {

    })
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
    this.onLoad()
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '上海羽琪科技文化创意中心技术支持',
      desc: '东方云服装定制小程序',
      path: ''
    }
  }
})
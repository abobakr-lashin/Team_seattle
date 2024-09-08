import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // استيراد الأنماط الافتراضية لـ Quill.js

export default function Commercialcreat() {
  // استخدام الـ state لحفظ البيانات المدخلة

  // تحديث البيانات المدخلة في الـ state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // تحديث البيانات للصور في الـ state
  const handleFileChange = (e) => {
    const { name } = e.target;
    setFormData({
      ...formData,
      [name]: e.target.files[0],
    });
  };

  // تحديث النص الخاص بمحرر Quill


  // إرسال البيانات
  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا يمكنك إرسال البيانات إلى الخادم أو التعامل معها
    console.log(formData);
  };
  // استخدام الـ state لحفظ البيانات المدخلة
  const [formData, setFormData] = useState({
    text: '', // النص الذي سيحتوي على المحتوى المنسق
  });

  // تحديث النص الخاص بمحرر Quill
  const handleQuillChange = (value) => {
    setFormData({
      ...formData,
      text: value,
    });
  };

  // إعداد شريط الأدوات لتطبيق التأثيرات على النص المحدد
  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'size': [] }], // تغيير حجم النص
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strike'], // التنسيقات: عريض، مائل، تسطير
      [{ 'color': [] }, { 'background': [] }], // لون النص والخلفية
      [{ 'align': [] }],
      ['link', 'image'], // إضافة رابط أو صورة
      ['clean'] // إزالة التنسيقات
    ]
  };
;
  return (
    <div>
      <div>
        <h1>Create categories</h1>
        <br />
        <form className="cardcreat" onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="file" name="cardImage" onChange={handleFileChange} placeholder="Upload card image" />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="title"
              placeholder="Title"
              maxLength="70"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <h1>Create Cards</h1>

          <div className="form-group">
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              name="beds"
              placeholder="BEDS"
              min="1"
              max="31"
              value={formData.beds}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="baths"
              placeholder="BATHS"
              min="1"
              max="31"
              value={formData.baths}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="square"
              placeholder="SQUARE"
              min="1900"
              max="2100"
              value={formData.square}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="qualities"
              placeholder="Qualities"
              maxLength="50"
              value={formData.qualities}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              maxLength="50"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>

          <h1>Landing Page</h1>

          <div className="form-group">
            <label htmlFor="slider" style={{ fontSize: '30px' }}>
              Image Slider
            </label>
            <input id="slider" type="file" name="sliderImage" onChange={handleFileChange} placeholder="Upload slider image" />
          </div>

          <div className="form-group">
            <input
              type="number"
              name="monthlyPayment"
              placeholder="Monthly Payment"
              min="1"
              value={formData.monthlyPayment}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="listingName"
              placeholder="Listing Name"
              value={formData.listingName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="stars"
              placeholder="Stars (⭐⭐)"
              value={formData.stars}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="map"
              placeholder="Map"
              value={formData.map}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="me" style={{ fontSize: '30px' }}>
              Image Listing By
            </label>
            <input id="me" type="file" name="listingImage" onChange={handleFileChange} placeholder="Upload listing image" />
          </div>

          <div className="form-group">
            <select style={{ margin: '20px', width: '80%' }} name="category" value={formData.category} onChange={handleInputChange}>
              <option value="">abi</option>
              <option value="ibr">ibr</option>
              <option value="zay">zay</option>
              <option value="ahme">ahme</option>
            </select>
          </div>

          <div className="form-group">
            {/* محرر النصوص Quill.js */}
            <ReactQuill
              theme="snow"
              value={formData.text}
              onChange={handleQuillChange}
              modules={modules} // تخصيص شريط الأدوات
              placeholder="Enter detailed description here..."
              style={{ height: '300px', width: '100%',padding: "10px", whiteSpace: "pre-wrap"  }} // التحكم في الطول والعرض
              />
          </div>
<br /><br />
<br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

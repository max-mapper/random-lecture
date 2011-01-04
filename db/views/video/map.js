function(doc) {
  if(doc.link) {
    emit(doc.link.split('v=')[1], doc._id);
  }
}
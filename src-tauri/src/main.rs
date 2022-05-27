#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

#[tauri::command]
fn my_custom_command() -> String {
  "Hello from Rust!".into()
}

#[tauri::command]
fn list_files() -> Vec<String> {
  let mut result = Vec::new();
  for entry in globwalk::glob("/Users/miles/Dropbox/opus/*")
    .expect("Glob error.")
    .filter_map(|e| e.ok())
  {
    if let Some(path) = entry.path().to_str() {
      result.push(path.to_string());
    }
  }
  return result;
}

fn main() {
  tauri::Builder::default()
    // This is where you pass in your commands
    .invoke_handler(tauri::generate_handler![my_custom_command])
    .invoke_handler(tauri::generate_handler![list_files])
    .run(tauri::generate_context!())
    .expect("failed to run app");
}
